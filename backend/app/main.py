from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import users, profile, tasks, routines
from app.database import Base, engine
from app import models


app = FastAPI(
    title="Bloom Backend API",
    description="Backend API for Bloom routines, tasks, profile settings and progress.",
    version="2.0.0",
)

# EN: Allow frontend apps to call this backend API
# JP: フロントエンドアプリがこのバックエンドAPIを呼び出せるようにする

origins = [
    "http://localhost:5173",
    "https://bloom-app-three-xi.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# EN: Create database tables during early development.
# JP: 初期開発中にデータベーステーブルを作成します。
Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(profile.router)
app.include_router(tasks.router)
app.include_router(routines.router)

@app.get("/")
def read_root():
    # EN: Basic health check route for confirming the backend is running.
    # JP: バックエンドが起動しているか確認するための基本ルートです。
    return {"message": "Bloom backend is running"}