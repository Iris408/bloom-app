// EN: Demo routines for new users to explore Bloom.
// JP: 新しいユーザーが Bloom を試すためのデモ用ルーティンです。

export const demoRoutines = [
  {
    id: "demo-routine-morning",
    title: "Morning Routine",
    label: "Morning",
    category: "Daily care",
    description: "A gentle routine for starting the day.",
    steps: [
      { id: "morning-step-1", text: "Drink a glass of water" },
      { id: "morning-step-2", text: "Wash face" },
      { id: "morning-step-3", text: "Brush teeth" },
      { id: "morning-step-4", text: "Get dressed" },
      { id: "morning-step-5", text: "Eat breakfast" },
      { id: "morning-step-6", text: "Check today’s plan" },
    ],
  },
  {
    id: "demo-routine-focus",
    title: "Focus Session",
    label: "Focus",
    category: "Study or work",
    description: "A short routine for beginning one focused task.",
    steps: [
      { id: "focus-step-1", text: "Clear your workspace" },
      { id: "focus-step-2", text: "Write down one goal" },
      { id: "focus-step-3", text: "Set a timer" },
      { id: "focus-step-4", text: "Work on one task only" },
      { id: "focus-step-5", text: "Take a short break" },
      { id: "focus-step-6", text: "Review what you completed" },
    ],
  },
  {
    id: "demo-routine-study",
    title: "Study Routine",
    label: "Study",
    category: "Learning",
    description: "A calm routine for starting and finishing a study session.",
    steps: [
      { id: "study-step-1", text: "Gather your materials" },
      { id: "study-step-2", text: "Write today’s study goal" },
      { id: "study-step-3", text: "Review previous notes" },
      { id: "study-step-4", text: "Study for 25 minutes" },
      { id: "study-step-5", text: "Take a short break" },
      { id: "study-step-6", text: "Write a quick recap" },
    ],
  },
  {
    id: "demo-routine-reset",
    title: "Reset Routine",
    label: "Reset",
    category: "Wellbeing",
    description: "A simple routine for resetting your space and attention.",
    steps: [
      { id: "reset-step-1", text: "Put away loose items" },
      { id: "reset-step-2", text: "Clear your desk or surface" },
      { id: "reset-step-3", text: "Drink some water" },
      { id: "reset-step-4", text: "Take three slow breaths" },
      { id: "reset-step-5", text: "Choose the next small task" },
    ],
  },
  {
    id: "demo-routine-evening",
    title: "Wind Down Routine",
    label: "Evening",
    category: "Daily care",
    description: "A gentle routine for closing the day.",
    steps: [
      { id: "evening-step-1", text: "Put away current tasks" },
      { id: "evening-step-2", text: "Prepare anything needed for tomorrow" },
      { id: "evening-step-3", text: "Wash face" },
      { id: "evening-step-4", text: "Brush teeth" },
      { id: "evening-step-5", text: "Read, rest, or listen to something calming" },
      { id: "evening-step-6", text: "Settle for sleep" },
    ],
  },
]

export const demoTasks = [
  {
    id: "demo-task-1",
    text: "Choose one small task for today",
    category: "Focus",
  },
  {
    id: "demo-task-2",
    text: "Review your morning routine",
    category: "Daily care",
  },
  {
    id: "demo-task-3",
    text: "Take a short reset break",
    category: "Wellbeing",
  },
]