from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from typing import Optional

class Settings(BaseSettings):
    # Supabase
    supabase_url: str = Field(..., env="SUPABASE_URL")
    supabase_service_role_key: str = Field(..., env="SUPABASE_SERVICE_ROLE_KEY")
    supabase_anon_key: Optional[str] = Field(default=None, env="SUPABASE_ANON_KEY")

    # Azure OpenAI (GPT-4o Vision + Embeddings)
    azure_openai_api_key: str = Field(..., env="AZURE_OPENAI_API_KEY")
    azure_openai_endpoint: str = Field(..., env="AZURE_OPENAI_ENDPOINT")
    azure_openai_embedding_endpoint: str = Field(..., env="AZURE_OPENAI_EMBEDDING_ENDPOINT")
    azure_openai_embedding_api_key: str = Field(..., env="AZURE_OPENAI_EMBEDDING_API_KEY")
    azure_openai_embedding_deployment: str = Field(..., env="AZURE_OPENAI_EMBEDDING_DEPLOYMENT")
    azure_openai_embedding_api_version: str = Field(..., env="AZURE_OPENAI_EMBEDDING_API_VERSION")

    # Google Gemini
    gemini_api_key: str = Field(..., env="GEMINI_API_KEY")

    # Other
    environment: str = Field(default="development", env="ENVIRONMENT")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )

settings = Settings()
