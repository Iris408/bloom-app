# EN: Lists keep a stable order after updates. PostgreSQL does not return rows
# in insertion order without ORDER BY (updated rows often move to the end).
# JP: 更新後も一覧の順序が変わらないことを確認します（PostgreSQLでは ORDER BY が必要）。

import pytest

LISTS = {
    "tasks": ("/tasks/", lambda i: {"title": f"Task {i}"}, {"completed": True}),
    "routines": ("/routines/", lambda i: {"name": f"Routine {i}"}, {"completed": True}),
    "focus-tasks": ("/focus-tasks/", lambda i: {"title": f"Focus {i}"}, {"completed": True}),
    "progress": (
        "/progress/",
        lambda i: {"snapshot_date": f"2026-10-1{i}"},
        {"completed_tasks": 1},
    ),
}


@pytest.mark.parametrize("name", sorted(LISTS))
def test_list_order_is_stable_after_update(client, user_a, name):
    path, make, update = LISTS[name]
    ids = [
        client.post(path, json=make(i), headers=user_a["headers"]).json()["id"]
        for i in range(3)
    ]

    client.put(f"{path}{ids[0]}", json=update, headers=user_a["headers"])

    listed = [item["id"] for item in client.get(path, headers=user_a["headers"]).json()]
    assert listed == ids


def test_routine_steps_keep_order_after_update(client, user_a):
    routine = client.post("/routines/", json={"name": "Evening"}, headers=user_a["headers"]).json()
    step_ids = [
        client.post(
            f"/routines/{routine['id']}/steps",
            json={"title": f"Step {i}", "step_order": i},
            headers=user_a["headers"],
        ).json()["id"]
        for i in range(3)
    ]

    client.put(f"/routines/steps/{step_ids[0]}", json={"completed": True}, headers=user_a["headers"])

    steps = client.get("/routines/", headers=user_a["headers"]).json()[0]["steps"]
    assert [step["id"] for step in steps] == step_ids
