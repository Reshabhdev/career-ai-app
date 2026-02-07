import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Career Recommendation Engine"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api/v1"
    DEBUG: bool = True  # <--- This was missing!
    
    # Paths (Dynamic, based on where the file is run)
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    DATA_DIR: str = os.path.join(BASE_DIR, "data")
    
    # File Names
    RAW_DATA_FILE: str = "Occupation Data.txt"
    RAW_SKILLS_FILE: str = "Skills.txt"
    PROCESSED_DATA_FILE: str = "career_gold_dataset.csv"
    EMBEDDINGS_FILE: str = "career_embeddings.npy"
    # Qdrant settings (cloud or local)
    QDRANT_URL: str | None = None
    QDRANT_API_KEY: str | None = None
    QDRANT_LOCAL_PATH: str = os.path.join(DATA_DIR, "qdrant_db")

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "ignore" # <--- This prevents crashing if .env has extra variables

# Create a global instance
settings = Settings()