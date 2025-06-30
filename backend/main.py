from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from backend.core.limiter import limiter
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from backend.api.restaurants import router as restaurants_router
from backend.api.menus import router as menus_router
from backend.api.menu_items import router as menu_items_router
from backend.api.menu_parsing import router as menu_parsing_router
from backend.api.auth import router as auth_router
from backend.api.search import router as search_router
from backend.core.logging_config import get_logger

app = FastAPI(
    title="MenuMind API",
    description="The backend for the MenuMind application.",
    version="0.1.0",
)

# Initialize slowapi Limiter (imported from backend.core.limiter)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

logger = get_logger("MenuMind")

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error"}
    )

app.include_router(restaurants_router)
app.include_router(menus_router)
app.include_router(menu_items_router)
app.include_router(menu_parsing_router)
app.include_router(auth_router)
app.include_router(search_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the MenuMind API!"}
