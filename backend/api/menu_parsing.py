from fastapi import APIRouter, File, UploadFile, HTTPException, Depends, Form
from fastapi.responses import JSONResponse
from backend.dependencies import get_current_user
from backend.core.config import settings
from backend.core.logging_config import get_logger
import requests
import base64

logger = get_logger(__name__)

router = APIRouter(prefix="/parse-menu", tags=["menu_parsing"])

# The prompt extracted from ScanUploadScreen.tsx
PROMPT = """
### ROLE AND GOAL ###
You are an AI-powered Intelligent Menu Analyst. Your purpose is twofold:
1.  **Extract:** Meticulously analyze the provided menu image and extract all explicit information (item names, descriptions, prices, categories).
2.  **Enrich:** Where information is missing, you must use your extensive culinary knowledge to infer and add valuable attributes like vegetarian status, spice level, and a generated description.

Your output is critical for a customer-facing AI. Accuracy is paramount. You must clearly distinguish between information you have extracted and information you have inferred.

### CONTEXT ###
The image is a restaurant menu. It may be incomplete, have handwritten specials, or lack detailed descriptions. Your job is to create a complete, structured, and intelligent dataset from this image.

### DETAILED INSTRUCTIONS ###
1.  **Identify Sections:** Scan the menu to identify distinct sections (e.g., "Appetizers," "Main Courses," "Pasta"). This will be the `category`.

2.  **Extract and Enrich Item Attributes:** For each item, you will generate a JSON object with the following attributes:

    *   **'name' (string):** Extract the exact item name. Capitalize it as a proper title.

    *   **'description' (string):**
        *   **If a description exists on the menu,** extract it precisely as written.
        *   **If a description is ABSENT,** you MUST generate a brief, accurate, and appealing one-sentence description based on the item's name and your culinary knowledge.

    *   **'description_source' (string):** This is a mandatory field for tracking your work.
        *   Set this to '"extracted"' if you took the description directly from the menu.
        *   Set this to '"inferred"' if you generated the description yourself.

    *   **'price' (string):** Extract and sanitize the price, removing currency symbols. If multiple prices/sizes exist, create a separate JSON object for each variant (e.g., "Soup (Cup)" and "Soup (Bowl)").

    *   **'category' (string):** Assign the section heading (e.g., "Appetizers").

    *   **'is_veg' (boolean):** This MUST be inferred. Analyze the item's name and description.
        *   Return 'true' if the dish is vegetarian (contains no meat, poultry, or fish). Look for keywords like "vegetable," "paneer," "tofu," or plant-based names.
        *   Return 'false' if it contains meat, poultry, or fish. Be conservative: if a dish is traditionally non-vegetarian (e.g., "Caesar Salad" with anchovies, "Spaghetti Carbonara" with guanciale) and not explicitly marked as vegetarian, you should default to 'false'.

    *   **'spice_level' (string):** This MUST be inferred. Estimate the spice level based on the item's name, ingredients, and origin. You MUST use one of the following exact string values:
        *   "none" (Default for most dishes)
        *   "mild"
        *   "medium"
        *   "hot"
        *   Look for keywords: "Spicy," "Chili," "Diabla," "Arrabbiata," "Jalapeño," "Habanero," "Vindaloo," "Sichuan."

3.  **Exclusion Criteria:** Ignore all non-menu text like addresses, phone numbers, logos, and general restaurant slogans.

### OUTPUT FORMAT ###
Your entire response MUST be a single, valid JSON object with no introductory text or markdown formatting. The root key must be 'menu_items', an array of objects structured exactly as defined below.

### EXAMPLE ###
Here is a perfect example of the required output format, demonstrating both extracted and inferred data.

{
  "menu_items": [
    {
      "name": "Classic Caesar Salad",
      "description": "Crisp romaine lettuce, house-made croutons, parmesan cheese, and creamy Caesar dressing.",
      "description_source": "extracted",
      "price": "12.00",
      "category": "Salads",
      "is_veg": false,
      "spice_level": "none"
    },
    {
      "name": "Penne Arrabbiata",
      "description": "Pasta in a spicy tomato sauce made with garlic and red chili peppers.",
      "description_source": "inferred",
      "price": "18.00",
      "category": "Pasta",
      "is_veg": true,
      "spice_level": "hot"
    },
    {
      "name": "Pollo al Mattone",
      "description": "Chicken under a brick, crispy skin, lemon-herb sauce.",
      "description_source": "extracted",
      "price": "26.50",
      "category": "Main Courses",
      "is_veg": false,
      "spice_level": "none"
    },
    {
      "name": "Lamb Vindaloo",
      "description": "A classic Goan curry with tender lamb marinated in vinegar and hot spices.",
      "description_source": "inferred",
      "price": "24.00",
      "category": "Main Courses",
      "is_veg": false,
      "spice_level": "hot"
    }
  ]
}
"""

AZURE_ENDPOINT = "https://calllive-o4realtime-agent.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2025-01-01-preview"

from typing import Optional

def get_embedding(text: str) -> Optional[list]:
    """
    Calls Azure OpenAI Embedding endpoint to get embedding for the given text.
    """
    import json
    try:
        endpoint = settings.azure_openai_embedding_endpoint
        api_key = settings.azure_openai_embedding_api_key
        deployment = settings.azure_openai_embedding_deployment
        api_version = settings.azure_openai_embedding_api_version

        url = f"{endpoint}/openai/deployments/{deployment}/embeddings?api-version={api_version}"
        headers = {
            "Content-Type": "application/json",
            "api-key": api_key,
        }
        body = {
            "input": text,
        }
        response = requests.post(url, headers=headers, json=body, timeout=30)
        if not response.ok:
            logger.error(f"Embedding API error: {response.status_code} - {response.text}")
            return None
        data = response.json()
        embedding = data.get("data", [{}])[0].get("embedding")
        if embedding is None:
            logger.error(f"Embedding missing in response: {data}")
        return embedding
    except Exception as e:
        logger.error(f"Embedding generation failed: {str(e)}", exc_info=True)
        return None

@router.post("/", response_class=JSONResponse)
async def parse_menu_image(
    file: UploadFile = File(...),
    menu_id: str = Form(...),
    user=Depends(get_current_user)
):
    logger.info(f"Menu parsing request received from user_id={getattr(user, 'id', None)}, file={file.filename}")
    try:
        # Read image and encode as base64 data URL
        image_bytes = await file.read()
        logger.info(f"File {file.filename} read, size={len(image_bytes)} bytes")
        base64_str = base64.b64encode(image_bytes).decode("utf-8")
        data_url = f"data:{file.content_type};base64,{base64_str}"

        headers = {
            "Content-Type": "application/json",
            "api-key": settings.azure_openai_api_key,
        }
        body = {
            "model": "gpt-4o-mini",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": data_url,
                            },
                        },
                        {
                            "type": "text",
                            "text": PROMPT,
                        },
                    ],
                }
            ],
            "max_tokens": 8192,
        }
        logger.info("Calling Azure OpenAI API for menu parsing")
        response = requests.post(AZURE_ENDPOINT, headers=headers, json=body, timeout=60)
        logger.info(f"Azure API response status: {response.status_code}")
        if not response.ok:
            try:
                error_msg = response.json().get("error", {}).get("message", "")
            except Exception:
                error_msg = response.text
            logger.error(f"Azure API error: {response.status_code} - {error_msg}")
            raise HTTPException(status_code=502, detail=f"Azure API error: {response.status_code} - {error_msg}")

        data = response.json()
        ocr_text = (
            data.get("choices", [{}])[0].get("message", {}).get("content")
            or data.get("choices", [{}])[0].get("content")
        )
        if not ocr_text:
            logger.error("No OCR result found in Azure response.")
            raise HTTPException(status_code=500, detail="No OCR result found in Azure response.")

        # Try to parse JSON, or return as string if not valid JSON
        import json
        def try_parse_json(text):
            # Remove code block markers if present
            import re
            text = text.strip()
            # Remove triple backticks and optional 'json'
            codeblock_pattern = r"^```(?:json)?\s*([\s\S]*?)\s*```$"
            match = re.match(codeblock_pattern, text, re.IGNORECASE)
            if match:
                text = match.group(1).strip()
            # Try parsing as JSON
            try:
                return json.loads(text)
            except Exception:
                # If text looks like a stringified JSON (starts and ends with quotes, lots of \n or \")
                if (
                    text.startswith('"') and text.endswith('"')
                    and ('\\n' in text or '\\"' in text)
                ):
                    try:
                        unescaped = json.loads(text)
                        return json.loads(unescaped)
                    except Exception:
                        pass
            return None

        menu_json = try_parse_json(ocr_text)
        if menu_json and isinstance(menu_json, dict) and "menu_items" in menu_json:
            parsed_items = menu_json.get("menu_items", [])
            logger.info(f"Parsing result: {len(parsed_items)} items extracted")

            # --- Persist parsed items to DB, concatenating with existing ---
            from backend.db.supabase_client import get_supabase_client
            supabase = get_supabase_client()

            # Fetch existing items for this menu
            existing_resp = supabase.table("menu_items").select("*").eq("menu_id", menu_id).execute()
            existing_items = existing_resp.data or []

            # Build set of (name, category, price) for deduplication
            existing_keys = set(
                (item["name"], item.get("category", ""), str(item.get("price", "")))
                for item in existing_items
            )

            # Filter out duplicates and add embeddings
            new_items = []
            for item in parsed_items:
                key = (item["name"], item.get("category", ""), str(item.get("price", "")))
                if key not in existing_keys:
                    # Generate embedding for "name + description"
                    name = item.get("name", "")
                    description = item.get("description", "")
                    embedding_input = f"{name} {description}".strip()
                    embedding = get_embedding(embedding_input)
                    logger.info(f"Menu item embedding input: {embedding_input}")
                    if embedding is not None:
                        logger.info(f"Menu item embedding (first 5): {embedding[:5]}")
                        item["embedding"] = embedding
                    else:
                        logger.warning(f"Embedding not generated for item: {name}")
                    item["menu_id"] = menu_id
                    new_items.append(item)

            logger.info(f"{len(new_items)} new menu items to insert for menu_id={menu_id}")

            # Insert new items if any
            inserted = []
            if new_items:
                insert_resp = supabase.table("menu_items").insert(new_items).execute()
                if not insert_resp.data:
                    logger.error(f"Failed to insert new menu items for menu_id={menu_id}")
                    raise HTTPException(status_code=500, detail="Failed to insert new menu items")
                inserted = insert_resp.data

            # Return all menu items for this menu
            all_resp = supabase.table("menu_items").select("*").eq("menu_id", menu_id).execute()
            all_items = all_resp.data or []
            logger.info(f"Returning {len(all_items)} total menu items for menu_id={menu_id}")
            return {"menu_items": all_items}
        else:
            logger.warning("Failed to parse JSON from OCR result (after code block and stringified JSON handling).")
            return {"raw_ocr_result": ocr_text}
    except Exception as e:
        logger.error(f"Menu parsing failed: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
