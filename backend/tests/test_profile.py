# EN: Profile/accessibility settings: persistence, validation and isolation.
# JP: プロフィール・アクセシビリティ設定の永続化、検証、分離のテストです。

from app import models
from app.database import SessionLocal


def test_profile_requires_authentication(client):
    assert client.get("/profile/").status_code == 401
    assert client.put("/profile/", json={"text_size": "large"}).status_code == 401


def test_new_account_has_default_profile(client, user_a):
    response = client.get("/profile/", headers=user_a["headers"])

    assert response.status_code == 200
    profile = response.json()
    assert profile["user_id"] == user_a["id"]
    assert profile["display_name"] == "alice"
    assert profile["theme"] == "light"
    assert profile["text_size"] == "medium"
    assert profile["dyslexic_font"] is False
    assert profile["reduce_motion"] is False
    assert profile["avatar_type"] == "initial"
    assert profile["avatar_id"] is None


def test_profile_updates_persist(client, user_a):
    update = {
        "display_name": "Al",
        "theme": "dark",
        "text_size": "xl",
        "dyslexic_font": True,
        "reduce_motion": True,
        "avatar_type": "bloom",
        "avatar_id": "bloom-avatar-3",
    }

    assert client.put("/profile/", json=update, headers=user_a["headers"]).status_code == 200

    profile = client.get("/profile/", headers=user_a["headers"]).json()
    for field, value in update.items():
        assert profile[field] == value


def test_partial_update_keeps_other_fields(client, user_a):
    client.put("/profile/", json={"dyslexic_font": True}, headers=user_a["headers"])
    client.put("/profile/", json={"text_size": "large"}, headers=user_a["headers"])

    profile = client.get("/profile/", headers=user_a["headers"]).json()
    assert profile["dyslexic_font"] is True
    assert profile["text_size"] == "large"


def test_null_does_not_clear_required_fields(client, user_a):
    response = client.put(
        "/profile/",
        json={"theme": None, "text_size": None, "display_name": None},
        headers=user_a["headers"],
    )

    assert response.status_code == 200
    profile = response.json()
    assert profile["theme"] == "light"
    assert profile["text_size"] == "medium"
    assert profile["display_name"] is None


def test_initial_avatar_clears_avatar_id(client, user_a):
    client.put(
        "/profile/",
        json={"avatar_type": "bloom", "avatar_id": "bloom-avatar-1"},
        headers=user_a["headers"],
    )
    profile = client.put(
        "/profile/", json={"avatar_type": "initial"}, headers=user_a["headers"]
    ).json()

    assert profile["avatar_type"] == "initial"
    assert profile["avatar_id"] is None


def test_profile_rejects_invalid_values(client, user_a):
    for payload in (
        {"text_size": "huge"},
        {"theme": "neon"},
        {"avatar_type": "uploaded"},
        {"avatar_id": "../../etc/passwd"},
        {"display_name": "x" * 51},
    ):
        response = client.put("/profile/", json=payload, headers=user_a["headers"])
        assert response.status_code == 422, payload


def test_profiles_are_isolated_between_accounts(client, user_a, user_b):
    client.put(
        "/profile/",
        json={"dyslexic_font": True, "text_size": "xl", "theme": "dark"},
        headers=user_a["headers"],
    )

    profile_b = client.get("/profile/", headers=user_b["headers"]).json()
    assert profile_b["user_id"] == user_b["id"]
    assert profile_b["dyslexic_font"] is False
    assert profile_b["text_size"] == "medium"
    assert profile_b["theme"] == "light"

    # EN: B updating their profile cannot change A's.
    # JP: B がプロフィールを更新しても A のものは変わりません。
    client.put("/profile/", json={"text_size": "small"}, headers=user_b["headers"])
    assert client.get("/profile/", headers=user_a["headers"]).json()["text_size"] == "xl"


def test_profile_ignores_user_id_in_payload(client, user_a, user_b):
    client.put(
        "/profile/",
        json={"user_id": user_b["id"], "text_size": "large"},
        headers=user_a["headers"],
    )

    assert client.get("/profile/", headers=user_a["headers"]).json()["user_id"] == user_a["id"]
    assert client.get("/profile/", headers=user_b["headers"]).json()["text_size"] == "medium"


def test_missing_profile_row_is_recreated(client, user_a):
    # EN: Older accounts may not have a profile row; they should get defaults, not a 404.
    # JP: 古いアカウントにプロフィール行がなくても、404 ではなくデフォルトを返します。
    with SessionLocal() as db:
        db.query(models.ProfileSettings).filter_by(user_id=user_a["id"]).delete()
        db.commit()

    response = client.get("/profile/", headers=user_a["headers"])
    assert response.status_code == 200
    assert response.json()["text_size"] == "medium"
