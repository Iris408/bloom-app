# EN: Task routes for Bloom Home page task persistence.
# JP: BloomのHomeページタスク永続化用ルートです。

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, relationship

from app import models, schemas
from app.database import get_db

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)

tasks = relationship(
    "User",
    back_populates="tasks",
    cascade="all, delete-orphan",
)

@router.post("/", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    # EN: Create a new task for a specific user.
    # JP: 特定のユーザー用に新しいタスクを作成します。
    user = db.query(models.User).filter(models.User.id == task.user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    new_task = models.Task(
        user_id=task.user_id,
        title=task.title,
        completed=task.completed,
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.get("/{user_id}", response_model=list[schemas.TaskResponse])
def get_tasks_for_user(user_id: int, db: Session = Depends(get_db)):
    # EN: Get all tasks for one user.
    # JP: 1人のユーザーのすべてのタスクを取得します。
    return db.query(models.Task).filter(models.Task.user_id == user_id).all()


@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(
    task_id: int,
    task_update: schemas.TaskUpdate,
    db: Session = Depends(get_db),
):
    # EN: Update a task title or completed state.
    # JP: タスク名または完了状態を更新します。
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    update_data = task_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(task, field, value)

    db.commit()
    db.refresh(task)

    return task


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    # EN: Delete one task.
    # JP: 1つのタスクを削除します。
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {"message": "Task deleted successfully"}