# EN: User routes for creating and reading Bloom users.
# JP: Bloomユーザーの作成と取得用ルートです。

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import models, schemas
from app.auth import get_current_user, hash_password
from app.database import get_db

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post("/", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # EN: Check if the email is already registered.
    # JP: メールアドレスがすでに登録されているか確認します。
    existing_email = (
        db.query(models.User)
        .filter(models.User.email == user.email)
        .first()
    )

    if existing_email is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered",
        )

    # EN: Check if the username is already taken.
    # JP: ユーザー名がすでに使われているか確認します。
    existing_username = (
        db.query(models.User)
        .filter(models.User.username == user.username)
        .first()
    )

    if existing_username is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username is already taken",
        )

    # EN: Create the user with a hashed password.
    # JP: ハッシュ化されたパスワードでユーザーを作成します。
    new_user = models.User(
        email=user.email,
        username=user.username,
        hashed_password=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # EN: Create default profile settings for the new user.
    # JP: 新しいユーザー用のデフォルトプロフィール設定を作成します。
    default_profile = models.ProfileSettings(
        user_id=new_user.id,
        display_name=new_user.username,
    )

    db.add(default_profile)
    db.commit()

    return new_user


@router.get("/me", response_model=schemas.UserResponse)
def get_logged_in_user(current_user: models.User = Depends(get_current_user)):
    # EN: Return the currently logged-in user from the JWT token.
    # JP: JWTトークンから現在ログイン中のユーザーを返します。
    return current_user


@router.get("/", response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    # EN: Return all users for early backend testing.
    # JP: 初期バックエンドテスト用に全ユーザーを返します。
    return db.query(models.User).all()