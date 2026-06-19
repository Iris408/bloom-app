# EN: Routine routes for Bloom routine builder persistence.
# JP: Bloomのルーティンビルダー永続化用ルートです。

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import get_db

from app.auth import get_current_user
from app.permissions import ensure_user_owns_resource

router = APIRouter(
    prefix="/routines",
    tags=["Routines"],
)


@router.post("/", response_model=schemas.RoutineResponse)
def create_routine(routine: schemas.RoutineCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):

    # EN: Make sure users can only create routines for themselves.
    # JP: ユーザーが自分自身のルーティンだけを作成できるようにします。
    ensure_user_owns_resource(routine.user_id, current_user.id)

    new_routine = models.Routine(
        user_id=routine.user_id,
        name=routine.name,
        completed=routine.completed,
    )

    db.add(new_routine)
    db.commit()
    db.refresh(new_routine)

    return new_routine


@router.get("/", response_model=list[schemas.RoutineResponse])
def get_routines_for_current_user(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):

    # EN: Get all routines for the currently logged-in user.
    # JP: 現在ログイン中のユーザーのすべてのルーティンを取得します。
    return (
        db.query(models.Routine)
        .filter(models.Routine.user_id == current_user.id)
        .all()
    )


@router.put("/{routine_id}", response_model=schemas.RoutineResponse)
def update_routine(routine_id: int, routine_update: schemas.RoutineUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # EN: Update a routine name or completed state.
    # JP: ルーティン名または完了状態を更新します。
    routine = db.query(models.Routine).filter(models.Routine.id == routine_id).first()

    if routine is None:
        raise HTTPException(status_code=404, detail="Routine not found")
    
    # EN: Make sure users can only update their own routines.
    # JP: ユーザーが自分自身のルーティンだけを更新できるようにします。
    ensure_user_owns_resource(routine.user_id, current_user.id)

    update_data = routine_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(routine, field, value)

    db.commit()
    db.refresh(routine)

    return routine


@router.delete("/{routine_id}")
def delete_routine(routine_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # EN: Delete one routine and its steps.
    # JP: 1つのルーティンとそのステップを削除します。
    routine = db.query(models.Routine).filter(models.Routine.id == routine_id).first()

    if routine is None:
        raise HTTPException(status_code=404, detail="Routine not found")
    
    # EN: Make sure users can only delete their own routines.
    # JP: ユーザーが自分自身のルーティンだけを削除できるようにします。
    ensure_user_owns_resource(routine.user_id, current_user.id)

    db.delete(routine)
    db.commit()

    return {"message": "Routine deleted successfully"}


@router.post("/{routine_id}/steps", response_model=schemas.RoutineStepResponse)
def create_routine_step(routine_id: int, step: schemas.RoutineStepCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):

    # EN: Add a step to an existing routine.
    # JP: 既存のルーティンにステップを追加します。
    routine = db.query(models.Routine).filter(models.Routine.id == routine_id).first()

    if routine is None:
        raise HTTPException(status_code=404, detail="Routine not found")
    
    # EN: Make sure users can only add steps to their own routines.
    # JP: ユーザーが自分自身のルーティンにだけステップを追加できるようにします。
    ensure_user_owns_resource(routine.user_id, current_user.id)

    new_step = models.RoutineStep(
        routine_id=routine_id,
        title=step.title,
        completed=step.completed,
        step_order=step.step_order,
    )

    db.add(new_step)
    db.commit()
    db.refresh(new_step)

    return new_step


@router.put("/steps/{step_id}", response_model=schemas.RoutineStepResponse)
def update_routine_step(step_id: int, step_update: schemas.RoutineStepUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    
    # EN: Update a routine step title, order, or completed state.
    # JP: ルーティンステップの名前、順番、完了状態を更新します。
    step = db.query(models.RoutineStep).filter(models.RoutineStep.id == step_id).first()

    if step is None:
        raise HTTPException(status_code=404, detail="Routine step not found")
    
    # EN: Make sure users can only update steps from their own routines.
    # JP: ユーザーが自分自身のルーティン内のステップだけを更新できるようにします。
    ensure_user_owns_resource(step.routine.user_id, current_user.id)

    update_data = step_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(step, field, value)

    db.commit()
    db.refresh(step)

    return step


@router.delete("/steps/{step_id}")
def delete_routine_step(step_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    
    # EN: Delete one routine step.
    # JP: 1つのルーティンステップを削除します。
    step = db.query(models.RoutineStep).filter(models.RoutineStep.id == step_id).first()

    if step is None:
        raise HTTPException(status_code=404, detail="Routine step not found")
    
    # EN: Make sure users can only delete steps from their own routines.
    # JP: ユーザーが自分自身のルーティン内のステップだけを削除できるようにします。
    ensure_user_owns_resource(step.routine.user_id, current_user.id)

    db.delete(step)
    db.commit()

    return {"message": "Routine step deleted successfully"}