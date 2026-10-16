# EN: Moments persistence, validation and account isolation.
# JP: Moments の永続化、検証、アカウント分離のテストです。

from datetime import datetime

MOMENT = {
    "title": "Morning walk",
    "description": "The light was lovely.",
    "tag": "Grateful",
    "image": "/images/memories/gentle-walk.png",
}


def create_moment(client, user, **overrides):
    response = client.post("/moments/", json={**MOMENT, **overrides}, headers=user["headers"])
    assert response.status_code == 201, response.text
    return response.json()


def test_moments_require_authentication(client):
    assert client.get("/moments/").status_code == 401
    assert client.post("/moments/", json=MOMENT).status_code == 401
    assert client.put("/moments/1", json={"title": "x"}).status_code == 401
    assert client.delete("/moments/1").status_code == 401


def test_create_list_update_delete(client, user_a):
    moment = create_moment(client, user_a)
    assert moment["user_id"] == user_a["id"]
    assert moment["title"] == "Morning walk"

    # EN: Timestamps are returned as timezone-aware UTC.
    # JP: タイムスタンプはタイムゾーン付きUTCで返されます。
    assert datetime.fromisoformat(moment["created_at"]).utcoffset().total_seconds() == 0

    listed = client.get("/moments/", headers=user_a["headers"]).json()
    assert [m["id"] for m in listed] == [moment["id"]]

    updated = client.put(
        f"/moments/{moment['id']}",
        json={"title": "Evening walk", "tag": "Reflective"},
        headers=user_a["headers"],
    ).json()
    assert updated["title"] == "Evening walk"
    assert updated["tag"] == "Reflective"
    assert updated["description"] == MOMENT["description"]

    assert client.delete(f"/moments/{moment['id']}", headers=user_a["headers"]).status_code == 200
    assert client.get("/moments/", headers=user_a["headers"]).json() == []


def test_moments_listed_newest_first(client, user_a):
    first = create_moment(client, user_a, title="First")
    second = create_moment(client, user_a, title="Second")

    listed = client.get("/moments/", headers=user_a["headers"]).json()
    assert [m["id"] for m in listed] == [second["id"], first["id"]]


def test_moments_reject_invalid_input(client, user_a):
    for overrides in (
        {"title": ""},
        {"title": "   "},
        {"title": "x" * 121},
        {"description": "x" * 1001},
        {"tag": "Productive"},
        {"image": "https://evil.example/tracker.png"},
        {"image": "/images/memories/../../secret.png"},
    ):
        response = client.post("/moments/", json={**MOMENT, **overrides}, headers=user_a["headers"])
        assert response.status_code == 422, overrides


def test_moments_are_isolated_between_accounts(client, user_a, user_b):
    moment = create_moment(client, user_a)

    assert client.get("/moments/", headers=user_b["headers"]).json() == []

    response = client.put(
        f"/moments/{moment['id']}", json={"title": "Hijacked"}, headers=user_b["headers"]
    )
    assert response.status_code == 403

    assert client.delete(f"/moments/{moment['id']}", headers=user_b["headers"]).status_code == 403

    still_there = client.get("/moments/", headers=user_a["headers"]).json()
    assert len(still_there) == 1
    assert still_there[0]["title"] == "Morning walk"


def test_moment_owner_cannot_be_reassigned(client, user_a, user_b):
    moment = client.post(
        "/moments/", json={**MOMENT, "user_id": user_b["id"]}, headers=user_a["headers"]
    ).json()
    assert moment["user_id"] == user_a["id"]

    client.put(
        f"/moments/{moment['id']}", json={"user_id": user_b["id"]}, headers=user_a["headers"]
    )
    assert client.get("/moments/", headers=user_b["headers"]).json() == []


def test_missing_moment_returns_404(client, user_a):
    assert client.put("/moments/999", json={"title": "x"}, headers=user_a["headers"]).status_code == 404
    assert client.delete("/moments/999", headers=user_a["headers"]).status_code == 404
