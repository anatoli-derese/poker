from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://anatoli@localhost:5432/my_db"

settings = Settings()
