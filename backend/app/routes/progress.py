# EN: Progress snapshot routes for Bloom Progress page persistence.
# JP: BloomのProgressページ進捗スナップショット永続化用ルートです。

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import get_db

router = APIRouter(
    prefix="/progress",
    tags=["Progress"],
)


@router.post("/", response_model=schemas.ProgressSnapshotResponse)
def create_progress_snapshot(
    snapshot: schemas.ProgressSnapshotCreate,
    db: Session = Depends(get_db),
):
    # EN: Create a new progress snapshot for a specific user.
    # JP: 特定のユーザー用に新しい進捗スナップショットを作成します。
    user = db.query(models.User).filter(models.User.id == snapshot.user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    new_snapshot = models.ProgressSnapshot(
        user_id=snapshot.user_id,
        snapshot_date=snapshot.snapshot_date,
        completed_tasks=snapshot.completed_tasks,
        total_tasks=snapshot.total_tasks,
        completed_routines=snapshot.completed_routines,
        total_routines=snapshot.total_routines,
        completed_focus_tasks=snapshot.completed_focus_tasks,
        total_focus_tasks=snapshot.total_focus_tasks,
    )

    db.add(new_snapshot)
    db.commit()
    db.refresh(new_snapshot)

    return new_snapshot


@router.get("/{user_id}", response_model=list[schemas.ProgressSnapshotResponse])
def get_progress_snapshots_for_user(user_id: int, db: Session = Depends(get_db)):
    # EN: Get all progress snapshots for one user.
    # JP: 1人のユーザーのすべての進捗スナップショットを取得します。
    return (
        db.query(models.ProgressSnapshot)
        .filter(models.ProgressSnapshot.user_id == user_id)
        .all()
    )


@router.put("/{snapshot_id}", response_model=schemas.ProgressSnapshotResponse)
def update_progress_snapshot(
    snapshot_id: int,
    snapshot_update: schemas.ProgressSnapshotUpdate,
    db: Session = Depends(get_db),
):
    # EN: Update an existing progress snapshot.
    # JP: 既存の進捗スナップショットを更新します。
    snapshot = (
        db.query(models.ProgressSnapshot)
        .filter(models.ProgressSnapshot.id == snapshot_id)
        .first()
    )

    if snapshot is None:
        raise HTTPException(status_code=404, detail="Progress snapshot not found")

    update_data = snapshot_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(snapshot, field, value)

    db.commit()
    db.refresh(snapshot)

    return snapshot


@router.delete("/{snapshot_id}")
def delete_progress_snapshot(snapshot_id: int, db: Session = Depends(get_db)):
    # EN: Delete one progress snapshot.
    # JP: 1つの進捗スナップショットを削除します。
    snapshot = (
        db.query(models.ProgressSnapshot)
        .filter(models.ProgressSnapshot.id == snapshot_id)
        .first()
    )

    if snapshot is None:
        raise HTTPException(status_code=404, detail="Progress snapshot not found")

    db.delete(snapshot)
    db.commit()

    return {"message": "Progress snapshot deleted successfully"}