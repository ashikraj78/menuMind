from pydantic import BaseModel, Field
from decimal import Decimal
from typing import Optional
from datetime import datetime
from uuid import UUID

class MenuItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    description_source: Optional[str] = None
    price: Decimal = Field(..., max_digits=10, decimal_places=2)
    category: Optional[str] = None
    is_veg: Optional[bool] = None
    spice_level: Optional[str] = None
    image_url: Optional[str] = None

class MenuItemCreate(MenuItemBase):
    menu_id: UUID

class MenuItemUpdate(MenuItemBase):
    pass

class MenuItemInDB(MenuItemBase):
    id: UUID
    menu_id: UUID
    embedding: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True

class MenuItemResponse(MenuItemInDB):
    pass
