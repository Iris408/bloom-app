// EN: Demo routines for new users to explore Bloom.
// JP: 新しいユーザーが Bloom を試すためのデモ用ルーティンです。

export const demoRoutines = [
  {
    id: "demo-routine-morning",
    title: "Gentle Morning Start",
    label: "Morning",
    category: "Daily care",
    description: "A soft low-pressure for easing into the day before sccreens, messages or tasks.",
    steps: [
      { id: "morning-step-1", text: "Open the curtains or turn on a warm light" },
      { id: "morning-step-2", text: "Drink a glass of water before checking your notifications" },
      { id: "morning-step-3", text: "Stretch your shoulders, neck, or hands for one minute" },
      { id: "morning-step-4", text: "Choose one gentle anchor for the day" },
    ],
  },
  {
    id: "demo-routine-focus",
    title: "Deep Focus Setup",
    label: "Focus",
    category: "Study or work",
    description: "A simple stup routine that lowers distractions and helps your brain transition into focused work.",
    steps: [
      { id: "focus-step-1", text: "Move your phone or biggest distraction out of sight" },
      { id: "focus-step-2", text: "Find a familiar soundscape, playlist, or quiet background noise" },
      { id: "focus-step-3", text: "Open only the tabs, notes, or tools need for this task" },
      { id: "focus-step-4", text: "Begin with just five minutes of low-pressure progress" },
      { id: "focus-step-5", text: "Take a short break" },
      { id: "focus-step-6", text: "Review what you completed" },
    ],
  },
  {
    id: "demo-routine-immersion",
    title: "The Analog Hour",
    label: "Offline",
    category: "Wellbeing",
    description: "A quiet screen-light routine for reconnecting with paper, small creative tasks, or slow thinking away from digital noise.",
    steps: [
      { id: "immersion-step-1", text: "Choose one offline item: a notebook, sketchpad, book, planner or a blank sheet of paper" },
      { id: "immersion-step-2", text: "Move your phone out of reach or place it face down" },
      { id: "immersion-step-3", text: "Spend 15-20 minutes reading, writing, planning, drawing, or reflecting" },
      { id: "immersion-step-4", text: "Write one small note about what felt useful, calming, or worth returning to" },
    ],
  },
  {
    id: "demo-routine-low-energy",
    title: "Low-Energy Momentum",
    label: "Flexible",
    category: "Wellbeing",
    description: "A supportive for days when energy, focus, or executive function feels limited.",
    steps: [
      { id: "reset-step-1", text: "Pick one task that takes two minutes or less" },
      { id: "reset-step-2", text: "Choose the smallest acceptable version of the task" },
      { id: "reset-step-3", text: "Move to a quieter, softer, or more comfortable space" },
      { id: "reset-step-4", text: "Celebrate the small win, then take a guilt-free rest" },
    ],
  },
  {
    id: "demo-routine-reset",
    title: "The Mid-day Reset",
    label: "Reset",
    category: "Wellbeing",
    description:
      "Clear visual noise, release tension, and gently restart your day.",
    steps: [
      { id: "reset-step-1", text: "Clear one small surface or remove one visible distraction" },
      { id: "reset-step-2", text: "Relax your jaw, lower your shoulders, and take three slow breaths" },
      { id: "reset-step-3", text: "Refresh your water, coffee, tea, or snack before returning" },
      { id: "reset-step-4", text: "Choose the next small step instead of the whole task", },
    ],
  },
  {
    id: "demo-routine-evening",
    title: "Evening Wind Down",
    label: "Evening",
    category: "Daily care",
    description:
      "Empty your mind, close out mental loops, reduce tomorrow's friction, and prepare to rest.",
    steps: [
      { id: "evening-step-1", text: "Write down any lingering tasks, reminders, or thoughts", },
      { id: "evening-step-2", text: "Prepare one small thing that will make tomorrow easier", },
      { id: "evening-step-3", text: "Dim the lights or switch to a softer activity", },
      { id: "evening-step-4", text: "End with one kind note about something you managed today" },
    ],
  },
]

export const demoTasks = [
  {
    id: "demo-task-1",
    text: "Choose one gentle anchor for today",
    category: "Focus",
  },
  {
    id: "demo-task-2",
    text: "Do one small thing that supports your morning",
    category: "Daily care",
  },
  {
    id: "demo-task-3",
    text: "Take a screen-free reset pause",
    category: "Wellbeing",
  },
];

export const demoFocusTasks = [
  {
    id: "demo-focus-1",
    title: "Five-Minute Start",
    label: "Low pressure",
    category: "Focus",
    durationMinutes: 5,
    description:
      "Begin with a tiny focus window so the task feels easier to approach.",
  },
  {
    id: "demo-focus-2",
    title: "Deep Focus Sprint",
    label: "Work block",
    category: "Study or work",
    durationMinutes: 25,
    description:
      "A gentle focused session for one clear task, with distractions lowered before starting.",
  },
  {
    id: "demo-focus-3",
    title: "Screen-Free Reset",
    label: "Reset",
    category: "Wellbeing",
    durationMinutes: 10,
    description:
      "Step away from screens for a short pause, break, drink, stretch, or quiet reset.",
  },
  {
    id: "demo-focus-4",
    title: "The Analog Hour",
    label: "Offline",
    category: "Daily care",
    durationMinutes: 60,
    description:
      "A calm offline focus session for reading, journaling, sketching, planning, or slow thinking.",
  },
  {
    id: "demo-focus-5",
    title: "Task Tidy-Up",
    label: "Light admin",
    category: "Focus",
    durationMinutes: 15,
    description:
      "A short session to clear one small admin task, message, note, or unfinished detail.",
  },
];