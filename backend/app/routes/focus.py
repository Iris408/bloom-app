# EN: Focus task routes for Bloom Focus page persistence.
# JP: BloomのFocusページタスク永続化用ルートです。

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import get_db

from app.auth import get_current_user
from app.permissions import ensure_user_owns_resource

router = APIRouter(
    prefix="/focus-tasks",
    tags=["Focus Tasks"],
)


@router.post("/", response_model=schemas.FocusTaskResponse)
def create_focus_task(focus_task: schemas.FocusTaskCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):

    new_focus_task = models.FocusTask(
        user_id=current_user.id,
        title=focus_task.title,
        completed=focus_task.completed,
    )

    db.add(new_focus_task)
    db.commit()
    db.refresh(new_focus_task)

    return new_focus_task


@router.get("/", response_model=list[schemas.FocusTaskResponse])
def get_focus_tasks_for_current_user(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):

    # EN: Get all focus tasks for the currently logged-in user.
    # JP: 現在ログイン中のユーザーのすべてのフォーカスタスクを取得します。
    return (db.query(models.FocusTask).filter(models.FocusTask.user_id == current_user.id).all())


@router.put("/{focus_task_id}", response_model=schemas.FocusTaskResponse)
def update_focus_task(focus_task_id: int, focus_task_update: schemas.FocusTaskUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):

    # EN: Update a focus task title or completed state.
    # JP: フォーカスタスク名または完了状態を更新します。
    focus_task = (
        db.query(models.FocusTask)
        .filter(models.FocusTask.id == focus_task_id)
        .first()
    )

    if focus_task is None:
        raise HTTPException(status_code=404, detail="Focus task not found")
    
    # EN: Make sure users can only update their own focus tasks.
    # JP: ユーザーが自分自身のフォーカスタスクだけを更新できるようにします。
    ensure_user_owns_resource(focus_task.user_id, current_user.id)

    update_data = focus_task_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(focus_task, field, value)

    db.commit()
    db.refresh(focus_task)

    return focus_task


@router.delete("/{focus_task_id}")
def delete_focus_task(focus_task_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # EN: Delete one focus task.
    # JP: 1つのフォーカスタスクを削除します。
    focus_task = (
        db.query(models.FocusTask)
        .filter(models.FocusTask.id == focus_task_id)
        .first()
    )

    if focus_task is None:
        raise HTTPException(status_code=404, detail="Focus task not found")
    
    # EN: Make sure users can only delete their own focus tasks.
    # JP: ユーザーが自分自身のフォーカスタスクだけを削除できるようにします。
    ensure_user_owns_resource(focus_task.user_id, current_user.id)

    db.delete(focus_task)
    db.commit()

    return {"message": "Focus task deleted successfully"}