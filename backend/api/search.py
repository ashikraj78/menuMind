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
    query: str = Query(..., description="Natural language search query"),
    category: Optional[str] = Query(None, description="Menu category"),
    is_veg: Optional[bool] = Query(None, description="Vegetarian filter"),
    price_max: Optional[float] = Query(None, description="Maximum price"),
    limit: int = Query(10, description="Max results"),
):
    """
    Hybrid RAG search endpoint: SQL filtering + vector similarity.
    """
    # 1. Generate embedding for the query using Azure OpenAI
    try:
        client = AzureOpenAI(
            api_key=settings.azure_openai_embedding_api_key,
            azure_endpoint=settings.azure_openai_embedding_endpoint,
            api_version=settings.azure_openai_embedding_api_version
        )
        embedding_response = client.embeddings.create(
            input=[query],
            model=settings.azure_openai_embedding_deployment
        )
        embedding = embedding_response.data[0].embedding
        logger.info(f"Search query embedding input: {query}")
        logger.info(f"Query embedding (first 5): {embedding[:5]}")
        logger.info(f"Type of embedding: {type(embedding)}")
        if isinstance(embedding, list):
            logger.info(f"Embedding length: {len(embedding)}")
            logger.info(f"Embedding types (first 5): {[type(x) for x in embedding[:5]]}")
        else:
            logger.warning(f"Embedding is not a list: {embedding}")
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Embedding service error: {str(e)}")

    # 2. Build SQL filter
    filters = [f"menu_id = '{menu_id}'"]
    if category:
        filters.append(f"category = '{category}'")
    if is_veg is not None:
        filters.append(f"is_veg = {str(is_veg).lower()}")
    if price_max is not None:
        filters.append(f"price <= {price_max}")

    where_clause = " AND ".join(filters)

    # 3. Query Supabase/Postgres with vector similarity using execute_sql RPC
    # NOTE: You must create a Postgres function called "execute_sql" in Supabase for this to work.
    # See: https://supabase.com/docs/guides/database/functions
    sql = f"""
        SELECT *, embedding::text as embedding, embedding <-> '[{','.join(map(str, embedding))}]' AS distance
        FROM menu_items
        WHERE {where_clause}
        ORDER BY distance ASC
        LIMIT {limit}
    """
    logger.info(f"Constructed SQL: {sql}")

    try:
        supabase = get_supabase_client()
        response = supabase.rpc("execute_sql", {"sql": sql}).execute()
        results = response.data if response.data else []
    except Exception as e:
        logger.error(f"Database query error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database query error: {str(e)}")

    if not results:
        return {"results": [], "message": "No results found."}

    return {"results": results}
