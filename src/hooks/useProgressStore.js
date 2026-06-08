// EN: Reads and writes daily Bloom progress snapshots to localStorage.
// JP: Bloom の日別進捗スナップショットを localStorage に保存・取得します。

import { useCallback } from "react";

const STORAGE_PREFIX = "bloom_progress_";

export function useProgressStore() {
  // EN: Load progress for one day.
  // JP: 1日分の進捗を読み込みます。
  const loadDay = useCallback((dateKey) => {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + dateKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  // EN: Save progress for one day.
  // JP: 1日分の進捗を保存します。
  const saveDay = useCallback((dateKey, snapshot) => {
    try {
      localStorage.setItem(STORAGE_PREFIX + dateKey, JSON.stringify(snapshot));
    } catch (error) {
      console.warn("Bloom: could not save progress snapshot", error);
    }
  }, []);

  // EN: Build today's snapshot from live routines and focus tasks.
  // JP: 現在のルーティンとフォーカスタスクから今日の進捗を作成します。
  const syncToday = useCallback(
    (dateKey, routines = [], focusTasks = []) => {
      const routineSnapshots = routines.map((routine) => {
        const steps = routine.steps ?? [];

        return {
          id: routine.id,
          name: routine.name,
          completedSteps: steps.filter((step) => step.completed).length,
          totalSteps: steps.length,
        };
      });

      const focusCompleted = focusTasks.filter(
        (task) => task.completedOn === dateKey
      ).length;

      const focusTotal = focusTasks.filter(
        (task) => task.scheduledFor === dateKey
      ).length;

      const totalSteps =
        routineSnapshots.reduce((total, routine) => total + routine.totalSteps, 0) +
        focusTotal;

      const completedSteps =
        routineSnapshots.reduce(
          (total, routine) => total + routine.completedSteps,
          0
        ) + focusCompleted;

      const snapshot = {
        routineSnapshots,
        focusCompleted,
        focusTotal,
        totalSteps,
        completedSteps,
      };

      saveDay(dateKey, snapshot);

      return snapshot;
    },
    [saveDay]
  );

  return { loadDay, saveDay, syncToday };
}