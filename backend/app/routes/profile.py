# EN: Profile settings routes for Bloom users.
# JP: Bloomユーザーのプロフィール設定用ルートです。

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import get_db
from app.auth import get_current_user

router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)

NULLABLE_PROFILE_FIELDS = {"display_name", "avatar_id"}


def get_or_create_profile_settings(db: Session, user: models.User):
    # EN: Return the user's settings, creating defaults if an older account has none.
    # JP: ユーザーの設定を返します。古いアカウントで設定がない場合はデフォルトを作成します。
    profile_settings = (
        db.query(models.ProfileSettings)
        .filter(models.ProfileSettings.user_id == user.id)
        .first()
    )

    if profile_settings is None:
        profile_settings = models.ProfileSettings(
            user_id=user.id,
            display_name=user.username,
        )
        db.add(profile_settings)
        db.commit()
        db.refresh(profile_settings)

    return profile_settings


@router.get("/", response_model=schemas.ProfileSettingsResponse)
def get_profile_settings(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # EN: Get profile/accessibility settings for the currently logged-in user.
    # JP: 現在ログイン中のユーザーのプロフィール・アクセシビリティ設定を取得します。
    profile_settings = get_or_create_profile_settings(db, current_user)

    return profile_settings


@router.put("/", response_model=schemas.ProfileSettingsResponse)
def update_profile_settings(
    profile_update: schemas.ProfileSettingsUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # EN: Update profile/accessibility settings for the currently logged-in user.
    # JP: 現在ログイン中のユーザーのプロフィール・アクセシビリティ設定を更新します。
    profile_settings = get_or_create_profile_settings(db, current_user)

    update_data = profile_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        # EN: Only display_name and avatar_id may be cleared with null.
        # JP: null で消去できるのは display_name と avatar_id だけです。
        if value is None and field not in NULLABLE_PROFILE_FIELDS:
            continue

        setattr(profile_settings, field, value)

    # EN: An initial-letter avatar has no preset avatar id.
    # JP: 頭文字アバターにはプリセットのアバターIDがありません。
    if profile_settings.avatar_type != "bloom":
        profile_settings.avatar_id = None

    db.commit()
    db.refresh(profile_settings)

    return profile_settings