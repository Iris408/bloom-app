from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


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

@app.get("/")
def read_root():
    # EN: Basic health check route for confirming the backend is running.
    # JP: バックエンドが起動しているか確認するための基本ルートです。
    return {"message": "Bloom backend is running"}