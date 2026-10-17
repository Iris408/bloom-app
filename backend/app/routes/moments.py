# EN: Moments routes for saving a user's memories.
# JP: ユーザーの思い出（Moments）を保存するためのルートです。

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.auth import get_current_user
from app.database import get_db
from app.permissions import ensure_user_owns_resource

router = APIRouter(
    prefix="/moments",
    tags=["Moments"],
)


def get_owned_moment(db: Session, moment_id: int, current_user: models.User):
    # EN: Find a Moment and make sure it belongs to the current user.
    # JP: Momentを探し、現在のユーザーのものか確認します。
    moment = db.query(models.Moment).filter(models.Moment.id == moment_id).first()

    if moment is None:
        raise HTTPException(status_code=404, detail="Moment not found")

    ensure_user_owns_resource(moment.user_id, current_user.id)

    return moment


@router.get("/", response_model=list[schemas.MomentResponse])
def get_moments_for_current_user(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # EN: Get the current user's Moments, newest first.
    # JP: 現在のユーザーのMomentsを新しい順に取得します。
    return (
        db.query(models.Moment)
        .filter(models.Moment.user_id == current_user.id)
        .order_by(models.Moment.created_at.desc(), models.Moment.id.desc())
        .all()
    )


@router.post("/", response_model=schemas.MomentResponse, status_code=201)
def create_moment(
    moment: schemas.MomentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    new_moment = models.Moment(
        user_id=current_user.id,
        title=moment.title.strip(),
        description=moment.description.strip(),
        tag=moment.tag,
        image=moment.image,
    )

    db.add(new_moment)
    db.commit()
    db.refresh(new_moment)

    return new_moment


@router.put("/{moment_id}", response_model=schemas.MomentResponse)
def update_moment(
    moment_id: int,
    moment_update: schemas.MomentUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    moment = get_owned_moment(db, moment_id, current_user)

    update_data = moment_update.model_dump(exclude_unset=True, exclude_none=True)

    for field, value in update_data.items():
        setattr(moment, field, value.strip() if isinstance(value, str) else value)

    db.commit()
    db.refresh(moment)

    return moment


@router.delete("/{moment_id}")
def delete_moment(
    moment_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    moment = get_owned_moment(db, moment_id, current_user)

    db.delete(moment)
    db.commit()

    return {"message": "Moment deleted successfully"}
