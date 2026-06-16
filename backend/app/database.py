# EN: Database connection setup for the Bloom backend.
# JP: Bloomバックエンド用のデータベース接続設定です。

import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# EN: Load environment variables from a .env file.
# JP: .envファイルから環境変数を読み込みます。
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./bloom.db")

# EN: SQLite needs this extra argument for local development.
# JP: SQLiteをローカル開発で使う場合、この追加設定が必要です。
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)

# EN: SessionLocal creates database sessions for API routes.
# JP: SessionLocalはAPIルートで使うデータベースセッションを作成します。
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# EN: Base is used by SQLAlchemy models.
# JP: BaseはSQLAlchemyモデルで使用します。
Base = declarative_base()

# EN: Dependency used by FastAPI routes to access the database.
# JP: FastAPIルートでデータベースにアクセスするための依存関数です。
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()    