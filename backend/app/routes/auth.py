# EN: Authentication routes for Bloom login.
# JP: Bloomログイン用の認証ルートです。

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import models, schemas
from app.auth import create_access_token, verify_password
from app.database import get_db

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


@router.post("/login", response_model=schemas.Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    # EN: Swagger sends the email through the username field.
    # JP: Swaggerではemailをusernameフィールドとして送信します。
    user = db.query(models.User).filter(models.User.email == form_data.username).first()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    access_token = create_access_token(
        data={"sub": user.email, "user_id": user.id}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }