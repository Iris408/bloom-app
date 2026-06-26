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