import { useState } from "react";
import { getCurrentUser, loginUser } from "../../api/bloomApi";

export default function LoginModal({ setCurrentUser, setActivePage, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      // EN: Log in and save the JWT token.
      // JP: ログインしてJWTトークンを保存します。
      await loginUser({ email, password });

      // EN: Use the saved token to fetch the logged-in user.
      // JP: 保存されたトークンを使ってログイン中のユーザーを取得します。
      const user = await getCurrentUser();

      setCurrentUser(user);

      // EN: After login, move into the protected app area.
      // JP: ログイン後、保護されたアプリ画面へ移動します。
      setActivePage("home");

      // EN: Close the login modal after successful login.
      // JP: ログイン成功後、ログインモーダルを閉じます。
      onClose();
    } catch (error) {
      setError("Login failed. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bloom-forest/40 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <section className="w-full max-w-md rounded-3xl border border-bloom-sage/30 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-dark-surface">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-bloom-mid">
              Welcome back
            </p>

            <h2
              id="login-modal-title"
              className="text-2xl font-bold text-bloom-forest dark:text-bloom-light"
            >
              Log in to Bloom
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              🌱 Continue with your calm routines, focus sessions, and daily tasks.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close login modal"
            className="rounded-full border border-bloom-sage/30 px-3 py-1 text-sm font-bold text-bloom-forest transition hover:bg-bloom-mint/30 dark:text-bloom-light dark:hover:bg-white/10"
          >
            x
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-bloom-forest dark:text-bloom-light"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mb-4 w-full rounded-xl border border-bloom-sage/40 bg-white px-3 py-2 text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:bg-white/10 dark:text-bloom-light"
          />

          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-bloom-forest dark:text-bloom-light"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mb-4 w-full rounded-xl border border-bloom-sage/40 bg-white px-3 py-2 text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:bg-white/10 dark:text-bloom-light"
          />

          {error && (
            <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-bloom-mid/80 px-4 py-3 text-sm font-semibold text-white transition hover:bg-bloom-mid disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </section>
    </div>
  );
}