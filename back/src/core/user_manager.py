from fastapi import Depends, FastAPI, Request
from fastapi_users import (
    BaseUserManager,
    FastAPIUsers,
    IntegerIDMixin,
    InvalidPasswordException,
    schemas,
)
from fastapi_users.db import SQLAlchemyUserDatabase
from pydantic import EmailStr
from sqlalchemy.ext.asyncio import AsyncSession

from core.auth import auth_backend, google_oauth_client
from core.config import get_settings
from core.schemas import BaseModel
from db.engine import get_async_session
from db.models import OAuthAccount, User

AUTH_TAG = "auth"
USERS_TAG = "users"

settings = get_settings()


class UserRead(BaseModel, schemas.BaseUser[int]):
    class Config:
        orm_mode = True


class UserCreate(BaseModel, schemas.CreateUpdateDictModel):
    email: EmailStr
    password: str

    class Config:
        orm_mode = True


class UserUpdate(schemas.BaseUserCreate):
    class Config:
        orm_mode = True


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User, OAuthAccount)


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = settings.PASSWORD_TOKEN_SECRET
    verification_token_secret = settings.VERIFICATION_TOKEN_SECRET
    reset_password_token_lifetime_seconds = 60 * 60 * 24

    async def on_after_register(self, user: User, request: Request | None = None):
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Request | None = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, request: Request | None = None
    ) -> None:
        print(f"Verification requested for user {user.id}. Verification token: {token}")

    async def on_after_delete(self, user: User, request: Request | None = None) -> None:
        print(f"User {user.id} is successfully deleted")

    async def validate_password(self, password: str, user: User) -> None:
        if len(password) < 8:
            raise InvalidPasswordException(
                reason="Password should be at least 8 characters"
            )

        if user.email in password:
            raise InvalidPasswordException(reason="Password should not contain e-mail")


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db=user_db)


fastapi_users = FastAPIUsers[User, int](
    get_user_manager=get_user_manager, auth_backends=[auth_backend]
)


def include_user_routers(app: FastAPI):
    app.include_router(
        fastapi_users.get_register_router(UserRead, UserCreate),
        prefix="/auth",
        tags=[AUTH_TAG],
    )

    app.include_router(
        fastapi_users.get_auth_router(auth_backend),
        prefix="/auth/jwt",
        tags=[AUTH_TAG],
    )

    app.include_router(
        fastapi_users.get_verify_router(UserRead),
        prefix="/auth",
        tags=[AUTH_TAG],
    )

    app.include_router(
        fastapi_users.get_reset_password_router(),
        prefix="/auth",
        tags=[AUTH_TAG],
    )

    app.include_router(
        fastapi_users.get_users_router(UserRead, UserUpdate),
        prefix="/users",
        tags=[USERS_TAG],
    )

    # TODO fix choose host in prod / local environments
    app.include_router(
        fastapi_users.get_oauth_router(
            google_oauth_client,
            auth_backend,
            state_secret=settings.SECRET_KEY,
            redirect_url="https://vk.com",
            associate_by_email=True,
            is_verified_by_default=True,
        ),
        prefix="/auth/google",
        tags=[AUTH_TAG],
    )
    app.include_router(
        fastapi_users.get_oauth_associate_router(
            google_oauth_client, UserRead, settings.SECRET_KEY
        ),
        prefix="/auth/associate/google",
        tags=[AUTH_TAG],
    )
