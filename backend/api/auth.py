from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
from backend.core.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])

class TokenRequest(BaseModel):
    email: str
    password: str

@router.post("/token")
def get_jwt_token(data: TokenRequest):
    url = f"{settings.supabase_url}/auth/v1/token?grant_type=password"
    headers = {
        "apikey": settings.supabase_anon_key,
        "Content-Type": "application/json"
    }
    payload = {
        "email": data.email,
        "password": data.password
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid credentials or Supabase error")
    return response.json()
