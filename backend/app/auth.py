# EN: Authentication helper functions for password hashing and JWT tokens.
# JP: パスワードハッシュ化とJWTトークン用の認証ヘルパー関数です。

import os
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import models
from app.database import get_db

from argon2 import PasswordHasher
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "dev-only-change-this-secret")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

password_hasher = PasswordHasher()


def hash_password(password: str) -> str:
    # EN: Convert a plain password into a secure Argon2id hash.
    # JP: 平文パスワードを安全なArgon2idハッシュに変換します。
    return password_hasher.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    # EN: Check whether a plain password matches the stored hash.
    # JP: 平文パスワードが保存済みハッシュと一致するか確認します。
    try:
        return password_hasher.verify(hashed_password, plain_password)
    except Exception:
        return False


def create_access_token(data: dict):
    # EN: Create a signed JWT access token with an expiry time.
    # JP: 有効期限付きの署名済みJWTアクセストークンを作成します。
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(
        token: str = Depends(oauth2_scheme),
        db: Session = Depends(get_db),
):
    # EN: Decode the JWT token and return the logged-in user.
    # JP: JWTトークンを復号し、ログイン中のユーザーを返します。
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate user credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str | None = payload.get("sub")

        if email is None:
            raise credentials_exception
        
    except JWTError:
        raise credentials_exception

    user = db.query(models.User).filter(models.User.email == email).first()

    if user is None:
        raise credentials_exception

    return user    