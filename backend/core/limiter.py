from slowapi import Limiter
from slowapi.util import get_remote_address

# Limiter instance for use across the app
limiter = Limiter(key_func=get_remote_address)
