from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

class RestaurantBase(BaseModel):
    name: str

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantUpdate(RestaurantBase):
    pass

class RestaurantInDB(RestaurantBase):
    id: UUID
    owner_id: UUID
    created_at: datetime

    class Config:
        orm_mode = True

class RestaurantResponse(RestaurantInDB):
    pass
