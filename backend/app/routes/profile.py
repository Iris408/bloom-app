# EN: Profile settings routes for Bloom users.
# JP: Bloomユーザーのプロフィール設定用ルートです。

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import get_db
from app.auth import get_current_user

router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)


@router.get("/", response_model=schemas.ProfileSettingsResponse)
def get_profile_settings(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # EN: Get profile/accessibility settings for the currently logged-in user.
    # JP: 現在ログイン中のユーザーのプロフィール・アクセシビリティ設定を取得します。
    profile_settings = (
        db.query(models.ProfileSettings)
        .filter(models.ProfileSettings.user_id == current_user.id)
        .first()
    )

    if profile_settings is None:
        raise HTTPException(status_code=404, detail="Profile settings not found")

    return profile_settings


@router.put("/", response_model=schemas.ProfileSettingsResponse)
def update_profile_settings(
    profile_update: schemas.ProfileSettingsUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # EN: Update profile/accessibility settings for the currently logged-in user.
    # JP: 現在ログイン中のユーザーのプロフィール・アクセシビリティ設定を更新します。
    profile_settings = (
        db.query(models.ProfileSettings)
        .filter(models.ProfileSettings.user_id == current_user.id)
        .first()
    )

    if profile_settings is None:
        raise HTTPException(status_code=404, detail="Profile settings not found")

    update_data = profile_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(profile_settings, field, value)

    db.commit()
    db.refresh(profile_settings)

    return profile_settings