from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class MenuBase(BaseModel):
    title: str

class MenuCreate(MenuBase):
    restaurant_id: UUID

class MenuUpdate(MenuBase):
    pass

class MenuInDB(MenuBase):
    id: UUID
    restaurant_id: UUID
    created_at: datetime

    class Config:
        orm_mode = True

class MenuResponse(MenuInDB):
    pass

class MenuWithItems(MenuInDB):
    items: List["MenuItemResponse"] = []

# For forward reference
from backend.models.menu_item import MenuItemResponse
MenuWithItems.update_forward_refs()
