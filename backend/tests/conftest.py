# EN: Shared pytest setup. Tests run against a disposable database: a temporary
# SQLite file by default, or TEST_DATABASE_URL (e.g. a local PostgreSQL test DB).
# JP: 共通の pytest 設定です。テストは使い捨てのデータベースで実行します。
# 既定は一時的な SQLite ファイル、TEST_DATABASE_URL があればそれ（例: PostgreSQL）を使います。

import os
import tempfile
import uuid

_test_db_dir = tempfile.mkdtemp(prefix="bloom-tests-")

# EN: Configure the environment before the app (and its engine) is imported.
# JP: アプリ（とエンジン）をインポートする前に環境変数を設定します。
os.environ["DATABASE_URL"] = os.environ.get(
    "TEST_DATABASE_URL",
    f"sqlite:///{os.path.join(_test_db_dir, 'test.db')}",
)
os.environ.setdefault("SECRET_KEY", "bloom-test-secret-key")

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from app.database import Base, engine  # noqa: E402
from app.main import app  # noqa: E402


@pytest.fixture(autouse=True)
def clean_database():
    # EN: Every test starts from an empty schema.
    # JP: 各テストは空のスキーマから始まります。
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client


def register_and_login(client, name=None):
    # EN: Create a user and return auth headers plus the user's data.
    # JP: ユーザーを作成し、認証ヘッダーとユーザーデータを返します。
    name = name or f"user{uuid.uuid4().hex[:8]}"
    email = f"{name}@bloom-test.dev"
    password = "Password123!"

    response = client.post(
        "/users/",
        json={"username": name, "email": email, "password": password},
    )
    assert response.status_code == 201, response.text

    login = client.post(
        "/auth/login",
        data={"username": email, "password": password},
    )
    assert login.status_code == 200, login.text

    headers = {"Authorization": f"Bearer {login.json()['access_token']}"}

    return {**response.json(), "headers": headers}


@pytest.fixture
def user_a(client):
    return register_and_login(client, "alice")


@pytest.fixture
def user_b(client):
    return register_and_login(client, "bobby")
