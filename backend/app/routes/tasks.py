# EN: Task routes for Bloom Home page task persistence.
# JP: BloomのHomeページタスク永続化用ルートです。

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import get_db
from app.auth import get_current_user
from app.permissions import ensure_user_owns_resource

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)

@router.post("/", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):

    # EN: Make sure users can only create tasks for themselves.
    # JP: ユーザーが自分自身のタスクだけを作成できるようにします。
    ensure_user_owns_resource(task.user_id, current_user.id)

    new_task = models.Task(
        user_id=task.user_id,
        title=task.title,
        completed=task.completed,
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.get("/", response_model=list[schemas.TaskResponse])
def get_tasks_for_current_user(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # EN: Get all tasks for the currently logged-in user.
    # JP: 現在ログイン中のユーザーのすべてのタスクを取得します。
    return db.query(models.Task).filter(models.Task.user_id == current_user.id).all()


@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):

    # EN: Update a task title or completed state.
    # JP: タスク名または完了状態を更新します。
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    ensure_user_owns_resource(task.user_id, current_user.id)

    update_data = task_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(task, field, value)

    db.commit()
    db.refresh(task)

    return task


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):

    # EN: Delete one task.
    # JP: 1つのタスクを削除します。
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    ensure_user_owns_resource(task.user_id, current_user.id)

    db.delete(task)
    db.commit()

    return {"message": "Task deleted successfully"}