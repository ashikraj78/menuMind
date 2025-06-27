from fastapi import APIRouter, Depends, HTTPException, status
from backend.models.menu import MenuCreate, MenuResponse, MenuUpdate, MenuWithItems
from backend.dependencies import get_current_user
from backend.db.supabase_client import get_supabase_client
from uuid import UUID

router = APIRouter(prefix="/menus", tags=["menus"])

@router.post("/", response_model=MenuResponse)
def create_menu(
    menu: MenuCreate,
    user=Depends(get_current_user)
):
    supabase = get_supabase_client()
    # Check if user owns the restaurant
    restaurant = supabase.table("restaurants").select("*").eq("id", menu.restaurant_id).single().execute()
    if not restaurant.data or restaurant.data["owner_id"] != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to add menu to this restaurant")
    result = supabase.table("menus").insert({
        "restaurant_id": str(menu.restaurant_id),
        "title": menu.title
    }).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create menu")
    return result.data[0]

@router.get("/{menu_id}", response_model=MenuWithItems)
def get_menu(menu_id: UUID):
    supabase = get_supabase_client()
    menu = supabase.table("menus").select("*").eq("id", str(menu_id)).single().execute()
    if not menu.data:
        raise HTTPException(status_code=404, detail="Menu not found")
    items = supabase.table("menu_items").select("*").eq("menu_id", str(menu_id)).execute()
    menu_data = menu.data
    menu_data["items"] = items.data if items.data else []
    return menu_data

@router.get("/", response_model=list[MenuResponse])
def list_all_menus():
    supabase = get_supabase_client()
    result = supabase.table("menus").select("*").execute()
    return result.data if result.data else []

@router.get("/restaurant/{restaurant_id}", response_model=list[MenuResponse])
def get_menus_for_restaurant(restaurant_id: UUID):
    supabase = get_supabase_client()
    result = supabase.table("menus").select("*").eq("restaurant_id", str(restaurant_id)).execute()
    return result.data if result.data else []

@router.put("/{menu_id}", response_model=MenuResponse)
def update_menu(
    menu_id: UUID,
    update: MenuUpdate,
    user=Depends(get_current_user)
):
    supabase = get_supabase_client()
    # Check ownership
    menu = supabase.table("menus").select("*").eq("id", str(menu_id)).single().execute()
    if not menu.data:
        raise HTTPException(status_code=404, detail="Menu not found")
    restaurant = supabase.table("restaurants").select("*").eq("id", menu.data["restaurant_id"]).single().execute()
    if not restaurant.data or restaurant.data["owner_id"] != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this menu")
    updated = supabase.table("menus").update({
        "title": update.title
    }).eq("id", str(menu_id)).execute()
    if not updated.data:
        raise HTTPException(status_code=500, detail="Failed to update menu")
    return updated.data[0]

@router.delete("/{menu_id}", status_code=204)
def delete_menu(
    menu_id: UUID,
    user=Depends(get_current_user)
):
    supabase = get_supabase_client()
    # Check ownership
    menu = supabase.table("menus").select("*").eq("id", str(menu_id)).single().execute()
    if not menu.data:
        raise HTTPException(status_code=404, detail="Menu not found")
    restaurant = supabase.table("restaurants").select("*").eq("id", menu.data["restaurant_id"]).single().execute()
    if not restaurant.data or restaurant.data["owner_id"] != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this menu")
    supabase.table("menus").delete().eq("id", str(menu_id)).execute()
    return
