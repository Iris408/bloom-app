# EN: User routes for creating and reading Bloom users.
# JP: Bloomユーザーの作成と取得用ルートです。
from app.auth import hash_password, get_current_user

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, relationship

from app.database import get_db
from app import models, schemas

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

tasks = relationship(
    "Task",
    back_populates="user",
    cascade="all, delete-orphan",
)


@router.post("/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # EN: Temporary plain password storage will be replaced with hashing/JWT later.
    # JP: 一時的な平文パスワード保存です。後でハッシュ化/JWTに置き換えます。
    new_user = models.User(
        email=user.email,
        username=user.username,
        hashed_password=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

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