import { useEffect, useState } from "react";
import { getCurrentUser, loginUser, registerUser } from "../../api/bloomApi";

const demoOptions = [
  {
    id: "simple-day",
    title: "Simple Day",
    description:
      "A calm preview with one routine, one focus block, and gentle tasks.",
  },
  {
    id: "neurodivergent-friendly",
    title: "Neurodivergent-friendly Day",
    description:
      "A softer setup with low-pressure routines and recovery-friendly wording.",
  },
  {
    id: "full-preview",
    title: "Full App Preview",
    description:
      "Explore Bloom with sample routines, focus sessions, moments, and settings.",
  },
];

export default function LoginModal({
  initialView = "login",
  setCurrentUser,
  setActivePage,
  onClose,
  onStartDemo,
  onAuthSuccess,
}) {
  const [modalView, setModalView] = useState(initialView);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [username, setUsername] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setModalView(initialView);
    setError("");
    setNotice("");
    setIsLoading(false);
  }, [initialView]);

  function completeAuth(user) {
    if (onAuthSuccess) {
      onAuthSuccess(user);
      return;
    }

    setCurrentUser(user);
    setActivePage("home");
    onClose();
  }

  async function handleLogin(event) {
    event.preventDefault();

    setError("");
    setNotice("");
    setIsLoading(true);

    try {
      await loginUser({
        email: loginEmail.trim(),
        password: loginPassword,
      });

      const user = await getCurrentUser();

      completeAuth(user);
    } catch (error) {
      setError(
        error.message || "Login failed. Please check your email and password."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateAccount(event) {
    event.preventDefault();

    setError("");
    setNotice("");

    const cleanUsername = username.trim();
    const cleanEmail = createEmail.trim();

    if (!cleanUsername || !cleanEmail || !createPassword) {
      setError("Please complete all required fields.");
      return;
    }

    if (createPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (createPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({
        username: cleanUsername,
        email: cleanEmail,
        password: createPassword,
      });

      await loginUser({
        email: cleanEmail,
        password: createPassword,
      });

      const user = await getCurrentUser();

      setNotice("Account created. Opening your Bloom space...");
      completeAuth(user);
    } catch (error) {
      setError(error.message || "Could not create your Bloom account.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenCreateAccount() {
    setError("");
    setNotice("");
    setModalView("create");
  }

  function handleOpenDemo() {
    setError("");
    setNotice("");
    setModalView("demo");
  }

  function handleOpenLogin() {
    setError("");
    setNotice("");
    setModalView("login");
  }

  function handleStartDemo(demoType) {
    setError("");
    setNotice("");

    if (onStartDemo) {
      onStartDemo(demoType);
    }

    setActivePage("home");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-bloom-forest/40 px-3 pb-3 pt-16 backdrop-blur-sm sm:items-center sm:px-4 sm:pb-0 sm:pt-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <section className="max-h-[86vh] w-full max-w-md overflow-y-auto rounded-[1.75rem] border border-bloom-sage/30 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-[#343442] sm:max-h-[90vh] sm:rounded-3xl sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-bloom-mid">
              Welcome to Bloom
            </p>

            <h2
              id="login-modal-title"
              className="text-xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-2xl"
            >
              {modalView === "login" && "Log in to Bloom"}
              {modalView === "create" && "Create your Bloom space"}
              {modalView === "demo" && "Try Bloom in demo mode"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              🌱 Continue your calm routines, focus sessions, and daily tasks.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close login modal"
            className="shrink-0 rounded-full border border-bloom-sage/30 px-3 py-1 text-sm font-bold text-bloom-forest transition hover:bg-bloom-mint/30 dark:text-bloom-light dark:hover:bg-white/10"
          >
            x
          </button>
        </div>

        {notice && (
          <p className="mb-4 rounded-2xl border border-bloom-sage/30 bg-bloom-mint/20 px-4 py-3 text-sm leading-6 text-bloom-forest dark:border-white/10 dark:bg-white/10 dark:text-bloom-light">
            {notice}
          </p>
        )}

        {error && (
          <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {modalView === "login" && (
          <>
            <form onSubmit={handleLogin}>
              <label
                htmlFor="login-email"
                className="mb-1 block text-sm font-medium text-bloom-forest dark:text-bloom-light"
              >
                Email
              </label>

              <input
                id="login-email"
                type="email"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                required
                className="mb-4 w-full rounded-xl border border-bloom-sage/40 bg-white px-3 py-2 text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:bg-white/10 dark:text-bloom-light"
              />

              <label
                htmlFor="login-password"
                className="mb-1 block text-sm font-medium text-bloom-forest dark:text-bloom-light"
              >
                Password
              </label>

              <input
                id="login-password"
                type="password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                required
                className="mb-4 w-full rounded-xl border border-bloom-sage/40 bg-white px-3 py-2 text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:bg-white/10 dark:text-bloom-light"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-bloom-mid px-4 py-3 text-sm font-semibold text-white transition hover:bg-bloom-forest disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Preparing your Bloom space..." : "Log in"}
              </button>
            </form>

            <div className="my-6 border-t border-bloom-sage/30 dark:border-white/10" />

            <div className="space-y-3 text-sm">
              <button
                type="button"
                onClick={handleOpenCreateAccount}
                className="w-full rounded-full border border-bloom-sage/40 px-4 py-2 text-center font-semibold text-bloom-forest transition hover:bg-bloom-mint/30 dark:bg-green-900/60 dark:text-bloom-light dark:hover:bg-bloom-forest/80"
              >
                ꕤ Create your space
              </button>

              <button
                type="button"
                onClick={handleOpenDemo}
                className="w-full rounded-full border border-bloom-sage/40 bg-bloom-mint/40 px-4 py-2 text-center font-semibold text-bloom-forest transition hover:bg-bloom-mint/60 dark:border-black/30 dark:bg-blue-900/40 dark:text-bloom-light dark:hover:bg-blue-600/20"
              >
                ☾ Have a gentle look around
              </button>
            </div>
          </>
        )}

        {modalView === "create" && (
          <>
            <div className="mb-5 rounded-2xl border border-bloom-sage/30 bg-bloom-mint/20 px-4 py-3 text-sm leading-6 text-bloom-forest dark:border-white/10 dark:bg-white/10 dark:text-bloom-light">
              Create a Bloom account to start moving from demo mode into a saved
              personal space.
            </div>

            <form onSubmit={handleCreateAccount}>
              <label
                htmlFor="create-username"
                className="mb-1 block text-sm font-medium text-bloom-forest dark:text-bloom-light"
              >
                Username
              </label>

              <input
                id="create-username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                className="mb-4 w-full rounded-xl border border-bloom-sage/40 bg-white px-3 py-2 text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:bg-white/10 dark:text-bloom-light"
              />

              <label
                htmlFor="create-email"
                className="mb-1 block text-sm font-medium text-bloom-forest dark:text-bloom-light"
              >
                Email
              </label>

              <input
                id="create-email"
                type="email"
                value={createEmail}
                onChange={(event) => setCreateEmail(event.target.value)}
                required
                className="mb-4 w-full rounded-xl border border-bloom-sage/40 bg-white px-3 py-2 text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:bg-white/10 dark:text-bloom-light"
              />

              <label
                htmlFor="create-password"
                className="mb-1 block text-sm font-medium text-bloom-forest dark:text-bloom-light"
              >
                Password
              </label>

              <input
                id="create-password"
                type="password"
                value={createPassword}
                onChange={(event) => setCreatePassword(event.target.value)}
                required
                className="mb-4 w-full rounded-xl border border-bloom-sage/40 bg-white px-3 py-2 text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:bg-white/10 dark:text-bloom-light"
              />

              <label
                htmlFor="confirm-password"
                className="mb-1 block text-sm font-medium text-bloom-forest dark:text-bloom-light"
              >
                Confirm password
              </label>

              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                className="mb-4 w-full rounded-xl border border-bloom-sage/40 bg-white px-3 py-2 text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:bg-white/10 dark:text-bloom-light"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-bloom-mid px-4 py-3 text-sm font-semibold text-white transition hover:bg-bloom-forest disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Creating your Bloom space..." : "Create account"}
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleOpenDemo}
                className="w-full rounded-full border border-bloom-sage/40 bg-bloom-mint/40 px-5 py-2.5 text-center text-sm font-semibold text-bloom-forest transition hover:bg-bloom-mint/60 dark:border-black/30 dark:bg-blue-900/40 dark:text-bloom-light dark:hover:bg-blue-600/20 sm:w-auto"
              >
                Try demo instead
              </button>

              <button
                type="button"
                onClick={handleOpenLogin}
                className="w-full rounded-full border border-bloom-sage/40 px-5 py-2.5 text-center text-sm font-semibold text-bloom-forest transition hover:bg-bloom-mint/30 dark:text-bloom-light dark:hover:bg-white/10 sm:w-auto"
              >
                Back to login
              </button>
            </div>
          </>
        )}

        {modalView === "demo" && (
          <>
            <button
              type="button"
              onClick={handleOpenLogin}
              className="mb-4 text-sm font-semibold text-bloom-mid hover:text-bloom-forest dark:text-bloom-light"
            >
              ← Back to login
            </button>

            <div className="mb-5 rounded-2xl border border-bloom-sage/30 bg-bloom-mint/20 px-4 py-3 text-sm leading-6 text-bloom-forest dark:border-white/10 dark:bg-white/10 dark:text-bloom-light">
              Demo mode uses sample data only. You can explore freely without
              creating an account.
            </div>

            <div className="space-y-3">
              {demoOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleStartDemo(option.id)}
                  className="w-full rounded-2xl border border-bloom-sage/30 bg-bloom-light/70 p-4 text-left transition hover:border-bloom-mid hover:bg-bloom-mint/20 dark:border-white/10 dark:bg-white/5 sm:p-5"
                >
                  <h3 className="mb-1 text-base font-bold text-bloom-forest dark:text-bloom-light">
                    {option.title}
                  </h3>

                  <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}