import json
from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List
import os
from openai import AzureOpenAI
from backend.db.supabase_client import get_supabase_client
from backend.core.config import settings
from backend.core.logging_config import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/search", tags=["search"])

@router.get("/")
async def hybrid_search(
    menu_id: str = Query(..., description="Menu UUID"),
    query: str = Query(..., description="Natural language search query (e.g., 'spicy chicken under $15')"),
    # These parameters can now be inferred by the LLM, but are kept for explicit filtering if needed
    category: Optional[str] = Query(None, description="Menu category (e.g., 'Appetizers', 'Main Course', 'Desserts')"),
    is_veg: Optional[bool] = Query(None, description="Vegetarian filter (true/false)"),
    price_max: Optional[float] = Query(None, description="Maximum price"),
    limit: int = Query(10, description="Max results"),
):
    """
    Hybrid RAG search endpoint with AI-powered filter extraction:
    Combines LLM function calling for filter extraction, vector similarity, and full-text search.
    """
    extracted_category = category
    extracted_is_veg = is_veg
    extracted_price_max = price_max
    
    # 1. Use LLM for Function Calling to extract filters from the query
    try:
        llm_client = AzureOpenAI(
            api_key=settings.azure_openai_api_key,
            azure_endpoint=settings.azure_openai_endpoint,
            api_version=settings.azure_openai_embedding_api_version # Assuming this version works for chat completions too
        )

        tools = [
            {
                "type": "function",
                "function": {
                    "name": "search_menu_items",
                    "description": "Search for menu items with optional filters.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "query": {
                                "type": "string",
                                "description": "The natural language query for menu items, excluding filter terms (e.g., 'spicy chicken', 'pasta dish')."
                            },
                            "category": {
                                "type": "string",
                                "description": "The category of the menu item (e.g., 'Appetizers', 'Main Course', 'Desserts')."
                            },
                            "is_veg": {
                                "type": "boolean",
                                "description": "True if the item should be vegetarian, false otherwise."
                            },
                            "price_max": {
                                "type": "number",
                                "description": "The maximum price for the menu item."
                            }
                        },
                        "required": ["query"]
                    }
                }
            }
        ]

        messages = [
            {"role": "system", "content": "You are a helpful assistant for searching menu items. Extract relevant search terms and filters."},
            {"role": "user", "content": query}
        ]

        logger.info(f"Calling LLM for function extraction with query: {query}")
        chat_response = llm_client.chat.completions.create(
            model="gpt-4o", # Or your specific chat completion deployment name
            messages=messages,
            tools=tools,
            tool_choice="auto"
        )
        
        tool_calls = chat_response.choices[0].message.tool_calls
        if tool_calls:
            for tool_call in tool_calls:
                if tool_call.function.name == "search_menu_items":
                    function_args = json.loads(tool_call.function.arguments)
                    
                    # Override explicit query params with LLM-extracted ones if present
                    if "category" in function_args:
                        extracted_category = function_args["category"]
                    if "is_veg" in function_args:
                        extracted_is_veg = function_args["is_veg"]
                    if "price_max" in function_args:
                        extracted_price_max = function_args["price_max"]
                    
                    # Use the LLM-parsed query for the actual search
                    query_for_search = function_args.get("query", query)
                    logger.info(f"LLM extracted filters: category={extracted_category}, is_veg={extracted_is_veg}, price_max={extracted_price_max}, query_for_search='{query_for_search}'")
        else:
            query_for_search = query # No tool call, use original query
            logger.info("LLM did not suggest a tool call. Using original query for search.")

    except Exception as e:
        logger.error(f"LLM function calling error: {str(e)}")
        # Fallback: proceed with original query and explicit filters if LLM fails
        query_for_search = query
        logger.warning("Falling back to original query and explicit filters due to LLM error.")

    # 2. Generate embedding for the (potentially refined) query using Azure OpenAI
    try:
        embedding_client = AzureOpenAI(
            api_key=settings.azure_openai_embedding_api_key,
            azure_endpoint=settings.azure_openai_embedding_endpoint,
            api_version=settings.azure_openai_embedding_api_version
        )
        embedding_response = embedding_client.embeddings.create(
            input=[query_for_search],
            model=settings.azure_openai_embedding_deployment
        )
        embedding = embedding_response.data[0].embedding
        logger.info(f"Search query embedding input: {query_for_search}")
        logger.info(f"Query embedding (first 5): {embedding[:5]}")
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Embedding service error: {str(e)}")

    # 3. Prepare parameters for the dedicated Supabase RPC
    params = {
        "query_embedding": embedding,
        "search_query": query_for_search, # Use the LLM-refined query for FTS
        "menu_uuid": menu_id,
        "p_category": extracted_category,
        "p_is_veg": extracted_is_veg,
        "p_price_max": extracted_price_max,
        "p_limit": limit,
    }
    logger.info(f"Calling RPC 'hybrid_search_items' with params: {params}")

    # 4. Query Supabase/Postgres by calling the dedicated function
    try:
        supabase = get_supabase_client()
        response = supabase.rpc("hybrid_search_items", params).execute()
        results = response.data if response.data else []
        
    except Exception as e:
        logger.error(f"Database RPC error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database query error: {str(e)}")

    if not results:
        return {"results": [], "message": "No results found."}

    return {"results": results}
