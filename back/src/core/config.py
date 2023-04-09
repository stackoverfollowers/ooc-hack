import os
from functools import lru_cache
from pathlib import Path
from typing import Any

from pydantic import BaseSettings, Field, PostgresDsn, RedisDsn, validator

USE_CACHED_SETTINGS = os.getenv("USE_CACHED_SETTINGS", "True").lower == "true"


class AppSettings(BaseSettings):
    PASSWORD_TOKEN_SECRET: str = Field(default="pwd_token_secret")
    VERIFICATION_TOKEN_SECRET: str = Field(default="verification_token_secret")

    JWT_SECRET_KEY: str = Field(default="jwt_secret_keys")

    TOKEN_LIFETIME_SECONDS: int = 60 * 60 * 24

    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_HOST: str
    POSTGRES_DB: str
    POSTGRES_PORT: str

    DATABASE_URI: PostgresDsn | None = None

    @validator("DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: str | None, values: dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql+asyncpg",
            user=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_HOST"),
            path=f"/{values.get('POSTGRES_DB') or ''}",
            port=f"{values.get('POSTGRES_PORT') or ''}",
        )

    REDIS_HOST: str
    REDIS_PORT: str
    REDIS_PASSWORD: str

    REDIS_URI: RedisDsn | None = None

    @validator("REDIS_URI", pre=True)
    def assemble_redis_uri(cls, v: str | None, values: dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return RedisDsn.build(
            scheme="redis",
            host=values.get("REDIS_HOST"),
            port=values.get("REDIS_PORT"),
            password=values.get("REDIS_PASSWORD"),
            path="/1",
        )

    STATIC_PATH: Path

    @validator("STATIC_PATH")
    def validate_path(cls, v):
        return Path(v)


def _get_settings(env_file: str | None = ".env"):
    if env_file is not None and os.path.isfile(env_file):
        return AppSettings(_env_file=env_file, _env_file_encoding="utf-8")
    return AppSettings()


@lru_cache
def get_cached_settings():
    return _get_settings()


def get_settings() -> AppSettings:
    if USE_CACHED_SETTINGS:
        return get_cached_settings()
    else:
        return _get_settings()
