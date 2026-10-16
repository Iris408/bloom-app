# EN: Persistence and ownership rules for tasks, routines, focus tasks and progress.
# These prove the backend enforces isolation, not just the frontend.
# JP: タスク、ルーティン、フォーカスタスク、進捗の永続化と所有権のテストです。

import pytest

RESOURCES = {
    "tasks": {
        "path": "/tasks/",
        "create": {"title": "Water plants", "emoji": "🌱"},
        "update": {"title": "Water all plants", "completed": True},
        "check": ("title", "Water all plants"),
    },
    "routines": {
        "path": "/routines/",
        "create": {"name": "Morning"},
        "update": {"name": "Gentle morning", "completed": True},
        "check": ("name", "Gentle morning"),
    },
    "focus-tasks": {
        "path": "/focus-tasks/",
        "create": {"title": "Read one page"},
        "update": {"title": "Read two pages", "completed": True},
        "check": ("title", "Read two pages"),
    },
    "progress": {
        "path": "/progress/",
        "create": {"snapshot_date": "2026-10-16", "completed_tasks": 1, "total_tasks": 3},
        "update": {"completed_tasks": 2},
        "check": ("completed_tasks", 2),
    },
}


@pytest.fixture(params=sorted(RESOURCES))
def resource(request):
    return RESOURCES[request.param]


def create(client, user, resource):
    response = client.post(resource["path"], json=resource["create"], headers=user["headers"])
    assert response.status_code in (200, 201), response.text
    return response.json()


def test_resource_persists_and_updates(client, user_a, resource):
    item = create(client, user_a, resource)
    assert item["user_id"] == user_a["id"]

    updated = client.put(
        f"{resource['path']}{item['id']}", json=resource["update"], headers=user_a["headers"]
    )
    assert updated.status_code == 200

    field, expected = resource["check"]
    listed = client.get(resource["path"], headers=user_a["headers"]).json()
    assert [entry[field] for entry in listed] == [expected]

    assert client.delete(f"{resource['path']}{item['id']}", headers=user_a["headers"]).status_code == 200
    assert client.get(resource["path"], headers=user_a["headers"]).json() == []


def test_other_account_cannot_list_update_or_delete(client, user_a, user_b, resource):
    item = create(client, user_a, resource)

    assert client.get(resource["path"], headers=user_b["headers"]).json() == []

    update = client.put(
        f"{resource['path']}{item['id']}", json=resource["update"], headers=user_b["headers"]
    )
    delete = client.delete(f"{resource['path']}{item['id']}", headers=user_b["headers"])
    assert update.status_code == 403
    assert delete.status_code == 403

    # EN: A's data is unchanged.
    # JP: A のデータは変わっていません。
    listed = client.get(resource["path"], headers=user_a["headers"]).json()
    assert len(listed) == 1
    field, _ = resource["check"]
    assert listed[0][field] == item[field]


def test_owner_cannot_be_reassigned_through_payload(client, user_a, user_b, resource):
    item = client.post(
        resource["path"],
        json={**resource["create"], "user_id": user_b["id"]},
        headers=user_a["headers"],
    ).json()
    assert item["user_id"] == user_a["id"]

    client.put(
        f"{resource['path']}{item['id']}",
        json={**resource["update"], "user_id": user_b["id"]},
        headers=user_a["headers"],
    )
    assert client.get(resource["path"], headers=user_b["headers"]).json() == []


def test_missing_resource_returns_404(client, user_a, resource):
    assert client.put(f"{resource['path']}999", json=resource["update"], headers=user_a["headers"]).status_code == 404
    assert client.delete(f"{resource['path']}999", headers=user_a["headers"]).status_code == 404


# EN: Routine steps are owned through their routine.
# JP: ルーティンステップは、所属するルーティンを通じて所有されます。

def make_routine_with_step(client, user):
    routine = client.post("/routines/", json={"name": "Evening"}, headers=user["headers"]).json()
    step = client.post(
        f"/routines/{routine['id']}/steps",
        json={"title": "Dim the lights", "step_order": 0},
        headers=user["headers"],
    ).json()
    return routine, step


def test_routine_steps_persist_in_order(client, user_a):
    routine, _ = make_routine_with_step(client, user_a)
    client.post(
        f"/routines/{routine['id']}/steps",
        json={"title": "Stretch", "step_order": 1},
        headers=user_a["headers"],
    )

    saved = client.get("/routines/", headers=user_a["headers"]).json()[0]
    assert [step["title"] for step in sorted(saved["steps"], key=lambda s: s["step_order"])] == [
        "Dim the lights",
        "Stretch",
    ]


def test_other_account_cannot_touch_routine_steps(client, user_a, user_b):
    routine, step = make_routine_with_step(client, user_a)

    add = client.post(
        f"/routines/{routine['id']}/steps", json={"title": "Injected"}, headers=user_b["headers"]
    )
    update = client.put(f"/routines/steps/{step['id']}", json={"completed": True}, headers=user_b["headers"])
    delete = client.delete(f"/routines/steps/{step['id']}", headers=user_b["headers"])

    assert add.status_code == 403
    assert update.status_code == 403
    assert delete.status_code == 403

    saved = client.get("/routines/", headers=user_a["headers"]).json()[0]
    assert [(s["title"], s["completed"]) for s in saved["steps"]] == [("Dim the lights", False)]


def test_deleting_routine_removes_its_steps(client, user_a):
    routine, step = make_routine_with_step(client, user_a)

    client.delete(f"/routines/{routine['id']}", headers=user_a["headers"])

    assert client.put(
        f"/routines/steps/{step['id']}", json={"completed": True}, headers=user_a["headers"]
    ).status_code == 404
