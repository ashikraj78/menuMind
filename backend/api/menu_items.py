from fastapi import APIRouter, Depends, HTTPException, status
from backend.models.menu_item import MenuItemCreate, MenuItemResponse, MenuItemUpdate
from backend.dependencies import get_current_user
from backend.db.supabase_client import get_supabase_client
from uuid import UUID

router = APIRouter(prefix="/menu-items", tags=["menu_items"])

@router.post("/", response_model=MenuItemResponse)
def create_menu_item(
    item: MenuItemCreate,
    user=Depends(get_current_user)
):
    supabase = get_supabase_client()
    # Check if user owns the menu
    menu = supabase.table("menus").select("*").eq("id", item.menu_id).single().execute()
    if not menu.data:
        raise HTTPException(status_code=404, detail="Menu not found")
    restaurant = supabase.table("restaurants").select("*").eq("id", menu.data["restaurant_id"]).single().execute()
    if not restaurant.data or restaurant.data["owner_id"] != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to add item to this menu")
    result = supabase.table("menu_items").insert(item.dict()).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create menu item")
    return result.data[0]

@router.get("/{item_id}", response_model=MenuItemResponse)
def get_menu_item(item_id: UUID):
    supabase = get_supabase_client()
    result = supabase.table("menu_items").select("*").eq("id", str(item_id)).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Menu item not found")
    item = result.data
    import json
    if "embedding" in item and isinstance(item["embedding"], str):
        try:
            item["embedding"] = json.loads(item["embedding"])
        except Exception:
            item["embedding"] = None
    # Always concatenate embedding to a string if present
    if "embedding" in item and isinstance(item["embedding"], list):
        item["embedding"] = ",".join(str(x) for x in item["embedding"])
    return item

@router.get("/menu/{menu_id}", response_model=list[MenuItemResponse])
def get_menu_items_for_menu(menu_id: UUID):
    supabase = get_supabase_client()
    result = supabase.table("menu_items").select("*").eq("menu_id", str(menu_id)).execute()
    items = result.data if result.data else []
    # Convert Decimal to float for price in each item
    from decimal import Decimal
    import json
    for item in items:
        if "price" in item and isinstance(item["price"], Decimal):
            item["price"] = float(item["price"])
        # Parse embedding if it's a string, then truncate for response
        if "embedding" in item:
            if isinstance(item["embedding"], str):
                try:
                    item["embedding"] = json.loads(item["embedding"])
                except Exception:
                    item["embedding"] = None
            if isinstance(item["embedding"], list):
                item["embedding"] = item["embedding"][:10]
    return items

@router.put("/{item_id}", response_model=MenuItemResponse)
def update_menu_item(
    item_id: UUID,
    update: MenuItemUpdate,
    user=Depends(get_current_user)
):
    supabase = get_supabase_client()
    # Check ownership
    item = supabase.table("menu_items").select("*").eq("id", str(item_id)).single().execute()
    if not item.data:
        raise HTTPException(status_code=404, detail="Menu item not found")
    menu = supabase.table("menus").select("*").eq("id", item.data["menu_id"]).single().execute()
    if not menu.data:
        raise HTTPException(status_code=404, detail="Menu not found")
    restaurant = supabase.table("restaurants").select("*").eq("id", menu.data["restaurant_id"]).single().execute()
    if not restaurant.data or restaurant.data["owner_id"] != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this menu item")
    update_data = update.dict(exclude_unset=True)
    # Convert Decimal to float for JSON serialization
    for k, v in update_data.items():
        try:
            from decimal import Decimal
            if isinstance(v, Decimal):
                update_data[k] = float(v)
        except ImportError:
            pass
    updated = supabase.table("menu_items").update(update_data).eq("id", str(item_id)).execute()
    if not updated.data:
        raise HTTPException(status_code=500, detail="Failed to update menu item")
    return updated.data[0]

@router.delete("/{item_id}", status_code=204)
def delete_menu_item(
    item_id: UUID,
    user=Depends(get_current_user)
):
    supabase = get_supabase_client()
    # Check ownership
    item = supabase.table("menu_items").select("*").eq("id", str(item_id)).single().execute()
    if not item.data:
        raise HTTPException(status_code=404, detail="Menu item not found")
    menu = supabase.table("menus").select("*").eq("id", item.data["menu_id"]).single().execute()
    if not menu.data:
        raise HTTPException(status_code=404, detail="Menu not found")
    restaurant = supabase.table("restaurants").select("*").eq("id", menu.data["restaurant_id"]).single().execute()
    if not restaurant.data or restaurant.data["owner_id"] != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this menu item")
    supabase.table("menu_items").delete().eq("id", str(item_id)).execute()
    return
