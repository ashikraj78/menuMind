from fastapi import APIRouter, Depends, HTTPException, status
from backend.models.restaurant import RestaurantCreate, RestaurantResponse, RestaurantUpdate
from backend.dependencies import get_current_user
from backend.db.supabase_client import get_supabase_client
from uuid import UUID

router = APIRouter(prefix="/restaurants", tags=["restaurants"])

@router.post("/", response_model=RestaurantResponse)
def create_restaurant(
    restaurant: RestaurantCreate,
    user=Depends(get_current_user)
):
    supabase = get_supabase_client()
    # Check if user already has a restaurant
    existing = supabase.table("restaurants").select("*").eq("owner_id", user.id).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="User already owns a restaurant")
    result = supabase.table("restaurants").insert({
        "owner_id": user.id,
        "name": restaurant.name
    }).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create restaurant")
    return result.data[0]

@router.get("/me", response_model=RestaurantResponse)
def get_my_restaurant(user=Depends(get_current_user)):
    supabase = get_supabase_client()
    result = supabase.table("restaurants").select("*").eq("owner_id", user.id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return result.data

@router.put("/me", response_model=RestaurantResponse)
def update_my_restaurant(
    update: RestaurantUpdate,
    user=Depends(get_current_user)
):
    supabase = get_supabase_client()
    # Find restaurant
    result = supabase.table("restaurants").select("*").eq("owner_id", user.id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    restaurant_id = result.data["id"]
    updated = supabase.table("restaurants").update({
        "name": update.name
    }).eq("id", restaurant_id).execute()
    if not updated.data:
        raise HTTPException(status_code=500, detail="Failed to update restaurant")
    return updated.data[0]
