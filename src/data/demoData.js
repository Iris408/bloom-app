export const quietStartTasks = [
  {
    id: "quiet-task-1",
    text: "Choose one gentle step for today",
    category: "Daily care",
    completed: false,
  },
  {
    id: "quiet-task-2",
    text: "Start with a short focus block",
    category: "Focus",
    completed: false,
  },
  {
    id: "quiet-task-3",
    text: "Notice one small win before you leave",
    category: "Reflection",
    completed: false,
  },
]

export const quietStartRoutines = [
  {
    id: "quiet-routine-1",
    name: "Quiet start routine",
    description: "A small routine for easing into the day.",
    steps: [
      {
        id: "quiet-routine-1-step-1",
        text: "Take one slow breath",
        completed: false,
      },
      {
        id: "quiet-routine-1-step-2",
        text: "Drink some water",
        completed: false,
      },
      {
        id: "quiet-routine-1-step-3",
        text: "Choose one thing to begin with",
        completed: false,
      },
      {
        id: "quiet-routine-1-step-4",
        text: "Pause before moving on",
        completed: false,
      },
    ],
  },
]

export const neurodivergentFriendlyTasks = [
  {
    id: "nd-task-1",
    text: "Check what your body needs first",
    category: "Body check",
    completed: false,
  },
  {
    id: "nd-task-2",
    text: "Pick the easiest next step",
    category: "Low pressure",
    completed: false,
  },
  {
    id: "nd-task-3",
    text: "Take a break without needing to earn it",
    category: "Recovery",
    completed: false,
  },
]

export const neurodivergentFriendlyRoutines = [
  {
    id: "nd-routine-1",
    name: "Low-pressure reset",
    description: "A calm reset routine with no pressure to finish everything.",
    steps: [
      {
        id: "nd-routine-1-step-1",
        text: "Notice your energy level",
        completed: false,
      },
      {
        id: "nd-routine-1-step-2",
        text: "Reduce one source of overwhelm",
        completed: false,
      },
      {
        id: "nd-routine-1-step-3",
        text: "Choose a tiny task or pause",
        completed: false,
      },
      {
        id: "nd-routine-1-step-4",
        text: "Give yourself permission to stop",
        completed: false,
      },
    ],
  },
  {
    id: "nd-routine-2",
    name: "Sensory-friendly start",
    description: "A softer start for noisy, busy, or difficult days.",
    steps: [
      {
        id: "nd-routine-2-step-1",
        text: "Adjust light, sound, or comfort if needed",
        completed: false,
      },
      {
        id: "nd-routine-2-step-2",
        text: "Put one useful item nearby",
        completed: false,
      },
      {
        id: "nd-routine-2-step-3",
        text: "Start with five quiet minutes",
        completed: false,
      },
    ],
  },
]

export const fullPreviewTasks = [
  {
    id: "full-task-1",
    text: "Review your morning routine",
    category: "Daily care",
    completed: false,
  },
  {
    id: "full-task-2",
    text: "Complete one focus task",
    category: "Focus",
    completed: false,
  },
  {
    id: "full-task-3",
    text: "Add a small moment",
    category: "Moments",
    completed: false,
  },
]

export const fullPreviewRoutines = [
  {
    id: "full-routine-1",
    name: "Morning routine",
    description: "A gentle morning routine for starting the day.",
    steps: [
      {
        id: "full-routine-1-step-1",
        text: "Drink water",
        completed: false,
      },
      {
        id: "full-routine-1-step-2",
        text: "Check today’s tasks",
        completed: false,
      },
      {
        id: "full-routine-1-step-3",
        text: "Start one focus block",
        completed: false,
      },
    ],
  },
  {
    id: "full-routine-2",
    name: "Evening reset",
    description: "A short reset routine for closing the day softly.",
    steps: [
      {
        id: "full-routine-2-step-1",
        text: "Clear one small space",
        completed: false,
      },
      {
        id: "full-routine-2-step-2",
        text: "Write down one thing that helped",
        completed: false,
      },
      {
        id: "full-routine-2-step-3",
        text: "Choose one gentle step for tomorrow",
        completed: false,
      },
    ],
  },
]

export function getDemoTasksByType(demoType) {
  if (
    demoType === "neurodivergent" ||
    demoType === "neurodivergent-day" ||
    demoType === "neurodivergentFriendly"
  ) {
    return neurodivergentFriendlyTasks
  }

  if (
    demoType === "full" ||
    demoType === "full-app-preview" ||
    demoType === "fullPreview"
  ) {
    return fullPreviewTasks
  }

  return quietStartTasks
}

export function getDemoRoutinesByType(demoType) {
  if (
    demoType === "neurodivergent" ||
    demoType === "neurodivergent-day" ||
    demoType === "neurodivergentFriendly"
  ) {
    return neurodivergentFriendlyRoutines
  }

  if (
    demoType === "full" ||
    demoType === "full-app-preview" ||
    demoType === "fullPreview"
  ) {
    return fullPreviewRoutines
  }

  return quietStartRoutines
}