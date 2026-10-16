# EN: Authentication and account-boundary tests.
# JP: 認証とアカウント境界のテストです。

from datetime import datetime, timedelta, timezone

from jose import jwt

from app.auth import ALGORITHM, SECRET_KEY


def test_register_login_and_me(client):
    response = client.post(
        "/users/",
        json={"username": "carol", "email": "carol@bloom-test.dev", "password": "Password123!"},
    )
    assert response.status_code == 201
    assert "hashed_password" not in response.json()

    login = client.post(
        "/auth/login", data={"username": "carol@bloom-test.dev", "password": "Password123!"}
    )
    assert login.status_code == 200

    me = client.get(
        "/users/me", headers={"Authorization": f"Bearer {login.json()['access_token']}"}
    )
    assert me.status_code == 200
    assert me.json()["email"] == "carol@bloom-test.dev"


def test_duplicate_email_and_username_rejected(client, user_a):
    same_email = client.post(
        "/users/",
        json={"username": "someone", "email": user_a["email"], "password": "Password123!"},
    )
    same_username = client.post(
        "/users/",
        json={"username": user_a["username"], "email": "new@bloom-test.dev", "password": "Password123!"},
    )

    assert same_email.status_code == 400
    assert same_username.status_code == 400


def test_wrong_password_and_unknown_email_rejected(client, user_a):
    wrong = client.post("/auth/login", data={"username": user_a["email"], "password": "nope"})
    unknown = client.post("/auth/login", data={"username": "ghost@bloom-test.dev", "password": "x"})

    assert wrong.status_code == 401
    assert unknown.status_code == 401
    assert wrong.json()["detail"] == unknown.json()["detail"]


def test_user_list_is_not_exposed(client, user_a):
    # EN: Listing every account would leak other users' emails.
    # JP: 全アカウントの一覧は他のユーザーのメールを漏らすため公開しません。
    assert client.get("/users/").status_code == 405
    assert client.get("/users/", headers=user_a["headers"]).status_code == 405


def test_invalid_tampered_and_expired_tokens_rejected(client, user_a):
    assert client.get("/users/me", headers={"Authorization": "Bearer not-a-token"}).status_code == 401

    forged = jwt.encode({"sub": user_a["email"]}, "wrong-secret", algorithm=ALGORITHM)
    assert client.get("/users/me", headers={"Authorization": f"Bearer {forged}"}).status_code == 401

    expired = jwt.encode(
        {"sub": user_a["email"], "exp": datetime.now(timezone.utc) - timedelta(minutes=1)},
        SECRET_KEY,
        algorithm=ALGORITHM,
    )
    assert client.get("/users/me", headers={"Authorization": f"Bearer {expired}"}).status_code == 401


def test_token_for_deleted_user_rejected(client):
    ghost = jwt.encode(
        {"sub": "deleted@bloom-test.dev", "exp": datetime.now(timezone.utc) + timedelta(minutes=5)},
        SECRET_KEY,
        algorithm=ALGORITHM,
    )
    assert client.get("/users/me", headers={"Authorization": f"Bearer {ghost}"}).status_code == 401


def test_protected_routes_require_authentication(client):
    for method, path in (
        ("get", "/users/me"),
        ("get", "/tasks/"),
        ("post", "/tasks/"),
        ("get", "/routines/"),
        ("post", "/routines/"),
        ("get", "/focus-tasks/"),
        ("post", "/focus-tasks/"),
        ("get", "/progress/"),
        ("post", "/progress/"),
        ("get", "/profile/"),
        ("get", "/moments/"),
    ):
        response = client.request(method.upper(), path, json={})
        assert response.status_code == 401, (method, path)
