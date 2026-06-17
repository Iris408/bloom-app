# EN: Focus task routes for Bloom Focus page persistence.
# JP: BloomのFocusページタスク永続化用ルートです。

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import get_db

router = APIRouter(
    prefix="/focus-tasks",
    tags=["Focus Tasks"],
)


@router.post("/", response_model=schemas.FocusTaskResponse)
def create_focus_task(
    focus_task: schemas.FocusTaskCreate,
    db: Session = Depends(get_db),
):
    # EN: Create a new focus task for a specific user.
    # JP: 特定のユーザー用に新しいフォーカスタスクを作成します。
    user = db.query(models.User).filter(models.User.id == focus_task.user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    new_focus_task = models.FocusTask(
        user_id=focus_task.user_id,
        title=focus_task.title,
        completed=focus_task.completed,
    )

    db.add(new_focus_task)
    db.commit()
    db.refresh(new_focus_task)

    return new_focus_task


@router.get("/{user_id}", response_model=list[schemas.FocusTaskResponse])
def get_focus_tasks_for_user(user_id: int, db: Session = Depends(get_db)):
    # EN: Get all focus tasks for one user.
    # JP: 1人のユーザーのすべてのフォーカスタスクを取得します。
    return db.query(models.FocusTask).filter(models.FocusTask.user_id == user_id).all()


@router.put("/{focus_task_id}", response_model=schemas.FocusTaskResponse)
def update_focus_task(
    focus_task_id: int,
    focus_task_update: schemas.FocusTaskUpdate,
    db: Session = Depends(get_db),
):
    # EN: Update a focus task title or completed state.
    # JP: フォーカスタスク名または完了状態を更新します。
    focus_task = (
        db.query(models.FocusTask)
        .filter(models.FocusTask.id == focus_task_id)
        .first()
    )

    if focus_task is None:
        raise HTTPException(status_code=404, detail="Focus task not found")

    update_data = focus_task_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(focus_task, field, value)

    db.commit()
    db.refresh(focus_task)

    return focus_task


@router.delete("/{focus_task_id}")
def delete_focus_task(focus_task_id: int, db: Session = Depends(get_db)):
    # EN: Delete one focus task.
    # JP: 1つのフォーカスタスクを削除します。
    focus_task = (
        db.query(models.FocusTask)
        .filter(models.FocusTask.id == focus_task_id)
        .first()
    )

    if focus_task is None:
        raise HTTPException(status_code=404, detail="Focus task not found")

    db.delete(focus_task)
    db.commit()

    return {"message": "Focus task deleted successfully"}