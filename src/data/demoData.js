// EN: Demo data for Bloom guided demos and full app preview.
// JP: Bloom のガイド付きデモとフルアプリプレビュー用のデモデータ。

// Quiet start — a calm, low-key entry point into Bloom.
// 静かなスタート — Bloom への穏やかな入り口。
export const quietStartTasks = [
  {
    id: "quiet-task-1",
    text: "Choose one small thing to begin with",
    category: "Daily care",
    icon: "🌱",
    completed: false,
  },
  {
    id: "quiet-task-2",
    text: "Try a gentle focus block",
    category: "Focus",
    icon: "⏳",
    completed: false,
  },
  {
    id: "quiet-task-3",
    text: "Notice one tiny thing that went well today",
    category: "Reflection",
    icon: "✨",
    completed: false,
  },
]

export const quietStartRoutines = [
  {
    id: "quiet-routine-1",
    name: "Quiet start routine",
    description: "A gentle sequence for slowly easing into the day.",
    icon: "🌊",
    steps: [
      {
        id: "quiet-routine-1-step-1",
        text: "Take one slow breath",
        time: "1 min",
        completed: false,
      },
      {
        id: "quiet-routine-1-step-2",
        text: "Drink some water slowly",
        time: "2 min",
        completed: false,
      },
      {
        id: "quiet-routine-1-step-3",
        text: "Choose one thing to begin with",
        time: "1 min",
        completed: false,
      },
      {
        id: "quiet-routine-1-step-4",
        text: "Pause before moving on",
        time: "1 min",
        completed: false,
      },
    ],
  },
  {
    id: "quiet-routine-2",
    name: "Soft reset routine",
    description: "A gentle reset for when the day feels slow or heavy.",
    icon: "🍃",
    steps: [
      {
        id: "quiet-routine-2-step-1",
        text: "Clear one small space around you",
        time: "3 min",
        completed: false,
      },
      {
        id: "quiet-routine-2-step-2",
        text: "Put one helpful item nearby",
        time: "1 min",
        completed: false,
      },
      {
        id: "quiet-routine-2-step-3",
        text: "Write down one small next step",
        time: "2 min",
        completed: false,
      },
    ],
  },
]

// Neurodivergent-friendly — the softest, most permission-giving demo set.
// 神経多様性に配慮した — 最も許容的なデモセット。
export const neurodivergentFriendlyTasks = [
  {
    id: "nd-task-1",
    text: "Check what your body needs first",
    category: "Check-in",
    icon: "🧠",
    completed: false,
  },
  {
    id: "nd-task-2",
    text: "Pick the easiest next step",
    category: "Ease",
    icon: "☁️",
    completed: false,
  },
  {
    id: "nd-task-3",
    text: "Take a break without needing to earn it",
    category: "Permission",
    icon: "🕊️",
    completed: false,
  },
]

export const neurodivergentFriendlyRoutines = [
  {
    id: "nd-routine-1",
    name: "Pressure-free reset",
    description: "A no-judgment routine with permission to stop at any point.",
    icon: "🌸",
    steps: [
      {
        id: "nd-routine-1-step-1",
        text: "Notice your current energy level",
        time: "1 min",
        completed: false,
      },
      {
        id: "nd-routine-1-step-2",
        text: "Set aside one expectation that feels too heavy",
        time: "1 min",
        completed: false,
      },
      {
        id: "nd-routine-1-step-3",
        text: "Choose a small comfort or take an intentional pause",
        time: "3 min",
        completed: false,
      },
      {
        id: "nd-routine-1-step-4",
        text: "Give yourself permission to stop or rest",
        time: "1 min",
        completed: false,
      },
    ],
  },
  {
    id: "nd-routine-2",
    name: "Sensory-friendly start",
    description: "A softer start for noisy, busy, or difficult days.",
    icon: "🎧",
    steps: [
      {
        id: "nd-routine-2-step-1",
        text: "Adjust light, sound, or comfort if needed",
        time: "2 min",
        completed: false,
      },
      {
        id: "nd-routine-2-step-2",
        text: "Place water or one helpful item nearby",
        time: "1 min",
        completed: false,
      },
      {
        id: "nd-routine-2-step-3",
        text: "Allow five quiet minutes before starting",
        time: "5 min",
        completed: false,
      },
    ],
  },
]

// Full preview — shows the whole app working together.
// フルプレビュー — アプリ全体の連携を示す。
export const fullPreviewTasks = [
  {
    id: "full-task-1",
    text: "Review your morning routine",
    category: "Daily care",
    icon: "☀️",
    completed: false,
  },
  {
    id: "full-task-2",
    text: "Try a short focus block",
    category: "Focus",
    icon: "🎯",
    completed: false,
  },
  {
    id: "full-task-3",
    text: "Add a small moment",
    category: "Moments",
    icon: "📷",
    completed: false,
  },
]

export const fullPreviewRoutines = [
  {
    id: "full-routine-1",
    name: "Morning routine",
    description: "A structured but gentle anchor for starting your day.",
    icon: "🌅",
    steps: [
      {
        id: "full-routine-1-step-1",
        text: "Drink water",
        time: "2 min",
        completed: false,
      },
      {
        id: "full-routine-1-step-2",
        text: "Review your gentle intentions for today",
        time: "2 min",
        completed: false,
      },
      {
        id: "full-routine-1-step-3",
        text: "Start your first small focus block",
        time: "15 min",
        completed: false,
      },
    ],
  },
  {
    id: "full-routine-2",
    name: "Evening unwind",
    description: "A soft evening routine to help you close the day.",
    icon: "🌙",
    steps: [
      {
        id: "full-routine-2-step-1",
        text: "Clear one small space",
        time: "5 min",
        completed: false,
      },
      {
        id: "full-routine-2-step-2",
        text: "Write down one thing that helped today",
        time: "2 min",
        completed: false,
      },
      {
        id: "full-routine-2-step-3",
        text: "Choose one helpful step for tomorrow",
        time: "3 min",
        completed: false,
      },
    ],
  },
]

export function normalizeDemoType(demoType) {
  if (!demoType) return "simple"

  return String(demoType)
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
}

export function isNeurodivergentDemoType(demoType) {
  const normalizedType = normalizeDemoType(demoType)

  return [
    "neurodivergent",
    "neurodivergent-day",
    "neurodivergent-friendly",
    "neurodivergent-friendly-day",
  ].includes(normalizedType)
}

export function isFullPreviewDemoType(demoType) {
  const normalizedType = normalizeDemoType(demoType)

  return [
    "full",
    "full-app",
    "full-app-preview",
    "full-preview",
    "full-preview-demo",
    "full-app-demo",
    "full-app-preview-demo",
    "fullapppreview",
    "fullpreview",
    "fullapp",
    "full-bloom",
  ].includes(normalizedType)
}

export function getDemoTasksByType(demoType) {
  if (isNeurodivergentDemoType(demoType)) {
    return neurodivergentFriendlyTasks
  }

  if (isFullPreviewDemoType(demoType)) {
    return fullPreviewTasks
  }

  return quietStartTasks
}

export function getDemoRoutinesByType(demoType) {
  if (isNeurodivergentDemoType(demoType)) {
    return neurodivergentFriendlyRoutines
  }

  if (isFullPreviewDemoType(demoType)) {
    return fullPreviewRoutines
  }

  return quietStartRoutines
}