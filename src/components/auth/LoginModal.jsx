import { useEffect, useState } from "react";
import { getCurrentUser, loginUser, registerUser } from "../../api/bloomApi";
import { saveBloomAvatarChoice } from "../../utils/avatarStorage";

import AvatarChoiceGrid from "../profile/AvatarChoiceGrid";

const demoOptions = [
  {
    id: "gentle-start",
    title: "A Quiet Start",
    eyebrow: "Gentle preview",
    description:
      "A peaceful introduction with a single routine, one focus block, and a few light tasks.",
  },
  {
    id: "neurodivergent-friendly",
    title: "Neurodivergent-friendly Day",
    eyebrow: "Low-pressure support",
    description:
      "Designed to reduce overwhelm. Features low-pressure structures, calm pacing, and supportive wording.",
  },
  {
    id: "full-bloom",
    title: "Full Bloom",
    eyebrow: "Complete demo",
    description:
      "A complete space loaded with sample routines, focus tracking, Bloom Moments, and custom configurations.",
  },
];

const modalCopy = {
  login: {
    eyebrow: "Welcome back",
    title: "Log in to Bloom",
    icon: "🌱",
    description:
      "Return to your calm routines, focus sessions, and saved Bloom space.",
    helperTitle: "Your space is waiting",
    helperText: "Your account area is part of the v2.0.0 foundation.",
  },
  create: {
    eyebrow: "Start gently",
    title: "Create your Bloom space",
    icon: "ꕤ",
    description:
      "Make a personal account so your routines and preferences can become yours.",
    helperTitle: "What this creates",
    helperText:
      "A basic account with username, email, secure password login, and a future profile space for goals and preferences.",
  },
  demo: {
    eyebrow: "Explore first",
    title: "Try Bloom in demo mode",
    icon: "☾",
    description:
      "Choose a gentle setup and discover Bloom.",
    helperTitle: "No account needed",
  },
};

function ModalIntro({ modalView }) {
  const copy = modalCopy[modalView];

  return (
    <div className="mb-4 rounded-2xl border border-bloom-sage/25 bg-bloom-light/60 p-4 dark:border-white/10 dark:bg-white/5">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bloom-forest text-xl text-bloom-light dark:bg-bloom-sage dark:text-dark-bg">
          {copy.icon}
        </span>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
            {copy.eyebrow}
          </p>

          <h2
            id="login-modal-title"
            className="mt-1 text-xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-2xl"
          >
            {copy.title}
          </h2>
        </div>
      </div>

      <p className="text-sm leading-6 text-bloom-forest/70 dark:text-gray-300 sm:max-w-[520px]">
        {copy.description}
      </p>
    </div>
  );
}

function HelperCard({ modalView }) {
  const copy = modalCopy[modalView];

  return (
    <div className="mb-4 rounded-2xl border border-bloom-sage/25 bg-white/70 px-4 py-3 text-sm leading-6 text-bloom-forest dark:border-white/10 dark:bg-white/5 dark:text-bloom-light">
      <p className="font-bold">{copy.helperTitle}</p>

      <p className="mt-1 text-bloom-forest/65 dark:text-gray-300">
        {copy.helperText}
      </p>
    </div>
  );
}

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

  const [selectedAvatarType, setSelectedAvatarType] = useState("initial");
  const [selectedAvatarId, setSelectedAvatarId] = useState(null);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(null);

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

  function handleSelectAvatar({ avatarType, avatarId, avatarUrl }) {
    setSelectedAvatarType(avatarType);
    setSelectedAvatarId(avatarId);
    setSelectedAvatarUrl(avatarUrl);
  }

  function saveAvatarChoice(user) {
    saveBloomAvatarChoice(user, {
      avatarType: selectedAvatarType,
      avatarId: selectedAvatarId,
      avatarUrl: selectedAvatarUrl,
    })
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

      saveAvatarChoice(user);

      setNotice("Account created. Opening your Bloom space...");
      completeAuth(user);
    } catch (error) {
      setError(error.message || "Could not create your Bloom account.");
    } finally {
      setIsLoading(false);
    }
  }

  function switchView(nextView) {
    setError("");
    setNotice("");
    setModalView(nextView);
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

  const createInitial =
    username.trim().charAt(0).toUpperCase() ||
    createEmail.trim().charAt(0).toUpperCase() ||
    "?";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-bloom-forest/40 px-3 pb-3 pt-16 backdrop-blur-sm sm:items-center sm:px-4 sm:pb-0 sm:pt-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <section className="max-h-[86vh] w-full max-w-[94vw] overflow-y-auto rounded-[1.5rem] border border-bloom-sage/30 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-[#343442] sm:max-h-[82vh] sm:max-w-[620px] sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
            Bloom
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close login modal"
            className="shrink-0 rounded-full border border-bloom-sage/30 px-3 py-1 text-sm font-bold text-bloom-forest transition hover:bg-bloom-mint/30 dark:text-bloom-light dark:hover:bg-white/10"
          >
            x
          </button>
        </div>

        <ModalIntro modalView={modalView} />

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
            <HelperCard modalView="login" />

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
                {isLoading ? "Opening Bloom..." : "Log in"}
              </button>
            </form>

            <div className="my-6 border-t border-bloom-sage/30 dark:border-white/10" />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => switchView("create")}
                className="rounded-2xl border border-bloom-sage/40 px-4 py-3 text-sm font-semibold text-bloom-forest transition hover:bg-bloom-mint/30 dark:text-bloom-light dark:hover:bg-white/10"
              >
                ꕤ Join Bloom
              </button>

              <button
                type="button"
                onClick={() => switchView("demo")}
                className="rounded-2xl border border-bloom-sage/40 bg-bloom-mint/40 px-4 py-3 text-sm font-semibold text-bloom-forest transition hover:bg-bloom-mint/60 dark:border-black/30 dark:bg-blue-900/40 dark:text-bloom-light dark:hover:bg-blue-600/20"
              >
                ☾ Try demo
              </button>
            </div>
          </>
        )}

        {modalView === "create" && (
          <>
            <HelperCard modalView="create" />

            <form onSubmit={handleCreateAccount}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
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
                    className="w-full rounded-xl border border-bloom-sage/40 bg-white px-3 py-2 text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:bg-white/10 dark:text-bloom-light"
                  />
                </div>

                <div>
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
                    className="w-full rounded-xl border border-bloom-sage/40 bg-white px-3 py-2 text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:bg-white/10 dark:text-bloom-light"
                  />
                </div>

                <div>
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
                    className="w-full rounded-xl border border-bloom-sage/40 bg-white px-3 py-2 text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:bg-white/10 dark:text-bloom-light"
                  />
                </div>

                <div>
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
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-bloom-sage/40 bg-white px-3 py-2 text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:bg-white/10 dark:text-bloom-light"
                  />
                </div>
              </div>

              <div className="mt-5">
                <AvatarChoiceGrid
                  selectedAvatarType={selectedAvatarType}
                  selectedAvatarId={selectedAvatarId}
                  onSelectAvatar={handleSelectAvatar}
                  currentInitial={createInitial}
                  showUploadOption={true}
                />  
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-5 w-full rounded-full bg-bloom-mid px-4 py-3 text-sm font-semibold text-white transition hover:bg-bloom-forest disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Creating your Bloom space..." : "Create account"}
              </button>
            </form>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => switchView("login")}
                className="rounded-2xl border border-bloom-sage/40 px-4 py-3 text-sm font-semibold text-bloom-forest transition hover:bg-bloom-mint/30 dark:text-bloom-light dark:hover:bg-white/10"
              >
                Back to login
              </button>

              <button
                type="button"
                onClick={() => switchView("demo")}
                className="rounded-2xl border border-bloom-sage/40 bg-bloom-mint/40 px-4 py-3 text-sm font-semibold text-bloom-forest transition hover:bg-bloom-mint/60 dark:border-black/30 dark:bg-blue-900/40 dark:text-bloom-light dark:hover:bg-blue-600/20"
              >
                ☾ Try demo
              </button>
            </div>
          </>
        )}

        {modalView === "demo" && (
          <>
            <HelperCard modalView="demo" />

            <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-3">
              {demoOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleStartDemo(option.id)}
                  className="flex h-full min-h-[32px] w-full flex-col rounded-2xl border border-bloom-sage/30 bg-bloom-light/70 p-4 text-left transition hover:border-bloom-mid hover:bg-bloom-mint/20 dark:border-white/10 dark:bg-white/5"
                >
                  <p className="mb-3 min-h-[32px] text-xs font-bold uppercase leading-4 tracking-[0.18em] text-bloom-mid dark:text-bloom-sage">
                    {option.eyebrow}
                  </p>

                  <h3 className="mb-3 min-h-[40px] text-sm font-bold leading-5 text-bloom-forest dark:text-bloom-light">
                    {option.title}
                  </h3>

                  <p className="flex-1 text-xs leading-5 text-gray-600 dark:text-gray-300">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => switchView("login")}
                className="rounded-2xl border border-bloom-sage/40 px-4 py-3 text-sm font-semibold text-bloom-forest transition hover:bg-bloom-mint/30 dark:text-bloom-light dark:hover:bg-white/10"
              >
                Back to login
              </button>

              <button
                type="button"
                onClick={() => switchView("create")}
                className="rounded-2xl bg-bloom-mid px-4 py-3 text-sm font-semibold text-white transition hover:bg-bloom-forest"
              >
                Create account
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}