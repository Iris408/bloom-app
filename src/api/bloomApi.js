// EN: Base URL for the Bloom backend API.
// JP: BloomバックエンドAPIのベースURLです。
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// EN: Get the saved JWT token from localStorage.
// JP: localStorageから保存済みJWTトークンを取得します。
export function getAuthToken() {
  return localStorage.getItem("bloom_access_token");
}

// EN: Save the JWT token after login.
// JP: ログイン後にJWTトークンを保存します。
export function saveAuthToken(token) {
  localStorage.setItem("bloom_access_token", token);
}

// EN: Remove the JWT token during logout.
// JP: ログアウト時にJWTトークンを削除します。
export function removeAuthToken() {
  localStorage.removeItem("bloom_access_token");
}

// EN: Create headers for public JSON backend requests.
// JP: 公開JSONリクエスト用のヘッダーを作成します。
export function getJsonHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

// EN: Create headers for protected backend requests.
// JP: 保護されたバックエンドリクエスト用のヘッダーを作成します。
export function getAuthHeaders() {
  const token = getAuthToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// EN: Create a clearer error message from a failed backend response.
// JP: バックエンドの失敗レスポンスから、分かりやすいエラーメッセージを作成します。
async function getApiErrorMessage(response, fallbackMessage) {
  try {
    const data = await response.json();

    if (typeof data.detail === "string") {
      return data.detail;
    }

    if (Array.isArray(data.detail)) {
      return data.detail
        .map((error) => error.msg || "Validation error")
        .join(", ");
    }

    return fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

// EN: Register a new Bloom user using the existing users endpoint.
// JP: 既存のユーザーエンドポイントを使って新しいBloomユーザーを登録します。
export async function registerUser({ username, email, password }) {
  const response = await fetch(`${API_BASE_URL}/users/`, {
    method: "POST",
    headers: getJsonHeaders(),
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (!response.ok) {
    const message = await getApiErrorMessage(
      response,
      "Failed to create account"
    );

    throw new Error(message);
  }

  return response.json();
}

// EN: Log in a Bloom user and save the JWT token.
// JP: Bloomユーザーをログインし、JWTトークンを保存します。
export async function loginUser({ email, password }) {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  if (!response.ok) {
    const message = await getApiErrorMessage(response, "Failed to login");
    throw new Error(message);
  }

  const data = await response.json();

  saveAuthToken(data.access_token);

  return data;
}

// EN: Log out the current Bloom user.
// JP: 現在のBloomユーザーをログアウトします。
export function logoutUser() {
  removeAuthToken();
}

// EN: Get the currently logged-in user from the backend.
// JP: バックエンドから現在ログイン中のユーザーを取得します。
export async function getCurrentUser() {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const message = await getApiErrorMessage(
      response,
      "Failed to fetch current user"
    );

    throw new Error(message);
  }

  return response.json();
}

// EN: Convert backend routine shape into frontend routine shape.
// JP: バックエンドのルーティン形式をフロントエンド用の形式に変換します。
function mapRoutineFromApi(routine) {
  return {
    id: routine.id,
    name: routine.name,
    completed: routine.completed,
    steps: [...(routine.steps || [])]
      .sort((firstStep, secondStep) => firstStep.step_order - secondStep.step_order)
      .map((step) => ({
        id: step.id,
        routineId: step.routine_id,
        text: step.title,
        completed: step.completed,
        stepOrder: step.step_order,
      })),
  };
}

// EN: Fetch routines for the logged-in user.
// JP: ログイン中ユーザーのルーティンを取得します。
export async function getRoutines() {
  const response = await fetch(`${API_BASE_URL}/routines/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const message = await getApiErrorMessage(response, "Failed to fetch routines");
    throw new Error(message);
  }

  const routines = await response.json();

  return routines.map(mapRoutineFromApi);
}

// EN: Create a new routine.
// JP: 新しいルーティンを作成します。
export async function createRoutine({ name, completed = false }) {
  const response = await fetch(`${API_BASE_URL}/routines/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      name,
      completed,
    }),
  });

  if (!response.ok) {
    const message = await getApiErrorMessage(response, "Failed to create routine");
    throw new Error(message);
  }

  const routine = await response.json();

  return mapRoutineFromApi(routine);
}

// EN: Update an existing routine.
// JP: 既存のルーティンを更新します。
export async function updateRoutine(routineId, updates) {
  const response = await fetch(`${API_BASE_URL}/routines/${routineId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const message = await getApiErrorMessage(response, "Failed to update routine");
    throw new Error(message);
  }

  const routine = await response.json();

  return mapRoutineFromApi(routine);
}

// EN: Delete an existing routine.
// JP: 既存のルーティンを削除します。
export async function deleteRoutine(routineId) {
  const response = await fetch(`${API_BASE_URL}/routines/${routineId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const message = await getApiErrorMessage(response, "Failed to delete routine");
    throw new Error(message);
  }

  return response.json();
}

// EN: Create a new step inside a routine.
// JP: ルーティン内に新しいステップを作成します。
export async function createRoutineStep(
  routineId,
  { title, completed = false, step_order = 0 }
) {
  const response = await fetch(`${API_BASE_URL}/routines/${routineId}/steps`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      title,
      completed,
      step_order,
    }),
  });

  if (!response.ok) {
    const message = await getApiErrorMessage(
      response,
      "Failed to create routine step"
    );
    throw new Error(message);
  }

  const step = await response.json();

  return {
    id: step.id,
    routineId: step.routine_id,
    text: step.title,
    completed: step.completed,
    stepOrder: step.step_order,
  };
}

// EN: Update an existing routine step.
// JP: 既存のルーティンステップを更新します。
export async function updateRoutineStep(stepId, updates) {
  const response = await fetch(`${API_BASE_URL}/routines/steps/${stepId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const message = await getApiErrorMessage(
      response,
      "Failed to update routine step"
    );
    throw new Error(message);
  }

  const step = await response.json();

  return {
    id: step.id,
    routineId: step.routine_id,
    text: step.title,
    completed: step.completed,
    stepOrder: step.step_order,
  };
}

// EN: Delete an existing routine step.
// JP: 既存のルーティンステップを削除します。
export async function deleteRoutineStep(stepId) {
  const response = await fetch(`${API_BASE_URL}/routines/steps/${stepId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const message = await getApiErrorMessage(
      response,
      "Failed to delete routine step"
    );
    throw new Error(message);
  }

  return response.json();
}

// EN: Convert backend focus task shape into frontend focus task shape.
// JP: バックエンドのフォーカスタスク形式をフロントエンド用の形式に変換します。
function mapFocusTaskFromApi(task, dateKey) {
  return {
    id: task.id,
    title: task.title,
    scheduledFor: dateKey,
    completedOn: task.completed ? dateKey : null,
  };
}

// EN: Fetch focus tasks for the logged-in user.
// JP: ログイン中ユーザーのフォーカスタスクを取得します。
export async function getFocusTasks(dateKey) {
  const response = await fetch(`${API_BASE_URL}/focus-tasks/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const message = await getApiErrorMessage(
      response,
      "Failed to fetch focus tasks"
    );
    throw new Error(message);
  }

  const tasks = await response.json();

  return tasks.map((task) => mapFocusTaskFromApi(task, dateKey));
}

// EN: Create a new focus task.
// JP: 新しいフォーカスタスクを作成します。
export async function createFocusTask({ title, completed = false }, dateKey) {
  const response = await fetch(`${API_BASE_URL}/focus-tasks/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      title,
      completed,
    }),
  });

  if (!response.ok) {
    const message = await getApiErrorMessage(
      response,
      "Failed to create focus task"
    );
    throw new Error(message);
  }

  const task = await response.json();

  return mapFocusTaskFromApi(task, dateKey);
}

// EN: Update an existing focus task.
// JP: 既存のフォーカスタスクを更新します。
export async function updateFocusTask(taskId, updates, dateKey) {
  const response = await fetch(`${API_BASE_URL}/focus-tasks/${taskId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const message = await getApiErrorMessage(
      response,
      "Failed to update focus task"
    );
    throw new Error(message);
  }

  const task = await response.json();

  return mapFocusTaskFromApi(task, dateKey);
}

// EN: Delete an existing focus task.
// JP: 既存のフォーカスタスクを削除します。
export async function deleteFocusTaskFromApi(taskId) {
  const response = await fetch(`${API_BASE_URL}/focus-tasks/${taskId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const message = await getApiErrorMessage(
      response,
      "Failed to delete focus task"
    );
    throw new Error(message);
  }

  return response.json();
}

function mapTaskFromApi(task) {
  return {
    id: task.id,
    text: task.title,
    completed: task.completed,
    emoji: "🌱",
  }
}

export async function getTasks() {
  const response = await fetch(`${API_BASE_URL}/tasks/`, {
    method: "GET",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    const message = await getApiErrorMessage(response, "Failed to fetch tasks")
    throw new Error(message)
  }

  const tasks = await response.json()

  return tasks.map(mapTaskFromApi)
}

export async function createTask({ title, completed = false }) {
  const response = await fetch(`${API_BASE_URL}/tasks/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      title,
      completed,
    }),
  })

  if (!response.ok) {
    const message = await getApiErrorMessage(response, "Failed to create task")
    throw new Error(message)
  }

  const task = await response.json()

  return mapTaskFromApi(task)
}

export async function updateTask(taskId, updates) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    const message = await getApiErrorMessage(response, "Failed to update task")
    throw new Error(message)
  }

  const task = await response.json()

  return mapTaskFromApi(task)
}

export async function deleteTaskFromApi(taskId) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    const message = await getApiErrorMessage(response, "Failed to delete task")
    throw new Error(message)
  }

  return response.json()
}