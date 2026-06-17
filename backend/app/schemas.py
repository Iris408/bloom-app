# EN: Pydantic schemas for request and response validation.
# JP: リクエストとレスポンス検証用のPydanticスキーマです。

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    # EN: Data required when creating a new user.
    # JP: 新しいユーザーを作成するときに必要なデータです。
    email: EmailStr
    username: str
    password: str


class UserResponse(BaseModel):
    # EN: Safe user data returned by the API.
    # JP: APIが返す安全なユーザーデータです。
    id: int
    email: EmailStr
    username: str

    class Config:
        from_attributes = True


class ProfileSettingsCreate(BaseModel):
    # EN: Initial profile settings for a new user.
    # JP: 新しいユーザー用の初期プロフィール設定です。
    display_name: str | None = None
    theme: str = "light"
    text_size: str = "medium"
    dyslexic_font: bool = False
    reduce_motion: bool = False


class ProfileSettingsUpdate(BaseModel):
    # EN: Optional profile settings update fields.
    # JP: 任意で更新できるプロフィール設定フィールドです。
    display_name: str | None = None
    theme: str | None = None
    text_size: str | None = None
    dyslexic_font: bool | None = None
    reduce_motion: bool | None = None


class ProfileSettingsResponse(BaseModel):
    # EN: Profile settings returned by the API.
    # JP: APIが返すプロフィール設定です。
    id: int
    user_id: int
    display_name: str | None
    theme: str
    text_size: str
    dyslexic_font: bool
    reduce_motion: bool

    class Config:
        from_attributes = True

class TaskCreate(BaseModel):
    # EN: Data required when creating a task.
    # JP: タスク作成時に必要なデータです。
    user_id: int
    title: str
    completed: bool = False


class TaskUpdate(BaseModel):
    # EN: Optional task update fields.
    # JP: 任意で更新できるタスクフィールドです。
    title: str | None = None
    completed: bool | None = None


class TaskResponse(BaseModel):
    # EN: Task data returned by the API.
    # JP: APIが返すタスクデータです。
    id: int
    user_id: int
    title: str
    completed: bool

    class Config:
        from_attributes = True

class RoutineStepCreate(BaseModel):
    # EN: Data required when creating a routine step.
    # JP: ルーティンステップ作成時に必要なデータです。
    title: str
    completed: bool = False
    step_order: int = 0


class RoutineStepUpdate(BaseModel):
    # EN: Optional routine step update fields.
    # JP: 任意で更新できるルーティンステップフィールドです。
    title: str | None = None
    completed: bool | None = None
    step_order: int | None = None


class RoutineStepResponse(BaseModel):
    # EN: Routine step data returned by the API.
    # JP: APIが返すルーティンステップデータです。
    id: int
    routine_id: int
    title: str
    completed: bool
    step_order: int

    class Config:
        from_attributes = True


class RoutineCreate(BaseModel):
    # EN: Data required when creating a routine.
    # JP: ルーティン作成時に必要なデータです。
    user_id: int
    name: str
    completed: bool = False


class RoutineUpdate(BaseModel):
    # EN: Optional routine update fields.
    # JP: 任意で更新できるルーティンフィールドです。
    name: str | None = None
    completed: bool | None = None


class RoutineResponse(BaseModel):
    # EN: Routine data returned by the API.
    # JP: APIが返すルーティンデータです。
    id: int
    user_id: int
    name: str
    completed: bool
    steps: list[RoutineStepResponse] = []

    class Config:
        from_attributes = True                