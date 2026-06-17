# EN: SQLAlchemy database models for the Bloom backend.
# JP: Bloomバックエンド用のSQLAlchemyデータベースモデルです。

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base
from datetime import datetime

class User(Base):
    # EN: Main user account table.
    # JP: メインのユーザーアカウントテーブルです。
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    # EN: One user has one profile settings record.
    # JP: 1人のユーザーは1つのプロフィール設定を持ちます。
    profile_settings = relationship(
        "ProfileSettings",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",
    )    

    tasks = relationship(
        "Task",
        back_populates="user",
        cascade="all, delete-orphan",    
    )

    # EN: One user can have many routines.
    # JP: 1人のユーザーは複数のルーティンを持つことができます。
    routines = relationship(
        "Routine",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    # EN: One user can have many focus tasks.
    # JP: 1人のユーザーは複数のフォーカスタスクを持つことができます。
    focus_tasks = relationship(
        "FocusTask",
        back_populates="user",
        cascade="all, delete-orphan",
    )

class ProfileSettings(Base):    
    # EN: Stores user accessibility and display preferences.
    # JP: ユーザーのアクセシビリティ設定と表示設定を保存します。
    __tablename__ = "profile_settings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    display_name = Column(String, nullable=True)

    theme = Column(String, default="light")
    text_size = Column(String, default="medium")
    dyslexic_font = Column(Boolean, default=False)
    reduce_motion = Column(Boolean, default=False)

    user = relationship("User", back_populates="profile_settings")


class Task(Base):
    # EN: Stores a user task from the Bloom Home page.
    # JP: BloomのHomeページのユーザータスクを保存します。
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    title = Column(String, nullable=False)
    completed = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="tasks")


class Routine(Base):
    # EN: Stores a user's routine.
    # JP: ユーザーのルーティンを保存します。
    __tablename__ = "routines"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    name = Column(String, nullable=False)
    completed = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="routines")
    steps = relationship(
        "RoutineStep",
        back_populates="routine",
        cascade="all, delete-orphan",
    )


class RoutineStep(Base):
    # EN: Stores one step inside a routine.
    # JP: ルーティン内の1つのステップを保存します。
    __tablename__ = "routine_steps"

    id = Column(Integer, primary_key=True, index=True)
    routine_id = Column(Integer, ForeignKey("routines.id"), nullable=False)

    title = Column(String, nullable=False)
    completed = Column(Boolean, default=False)
    step_order = Column(Integer, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    routine = relationship("Routine", back_populates="steps")    

class FocusTask(Base):
    # EN: Stores a user's Focus page task.
    # JP: ユーザーのFocusページ用タスクを保存します。
    __tablename__ = "focus_tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    title = Column(String, nullable=False)
    completed = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="focus_tasks")    