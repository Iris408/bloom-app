import { useState } from "react";
import { getCurrentUser, loginUser } from "../api/bloomApi";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
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
          } catch (error) {
            setError("Login failed. Please check your email and password.");
          } finally {
            setIsLoading(false);
          }
        }

  return (
    <section className="w-full max-w-md rounded-2xl bg-white/80 p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">Backend login test</h2>

      <form onSubmit={handleLogin}>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mb-3 w-full rounded-lg border px-3 py-2"
        />

        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mb-3 w-full rounded-lg border px-3 py-2"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-green-700 px-4 py-2 text-white disabled:opacity-60"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {currentUser && (
        <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm">
          <p>Logged in as: {currentUser.username}</p>
          <p>Email: {currentUser.email}</p>
        </div>
      )}
    </section>
  );
}