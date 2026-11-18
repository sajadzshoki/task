import type { Task } from './types'

export function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export interface Progress {
  completed: number
  total: number
  percent: number
}

/**
 * Progress of a single task: based on its subtasks, or on its own
 * completion status when it has no subtasks.
 */
export function getTaskProgress(task: Task): Progress {
  if (task.subtasks.length === 0) {
    return {
      completed: task.completed ? 1 : 0,
      total: 1,
      percent: task.completed ? 100 : 0,
    }
  }
  const completed = task.subtasks.filter((subtask) => subtask.completed).length
  const total = task.subtasks.length
  return { completed, total, percent: Math.round((completed / total) * 100) }
}

/** Aggregate progress across all tasks. */
export function getOverallProgress(tasks: Task[]): Progress {
  let completed = 0
  let total = 0
  for (const task of tasks) {
    const progress = getTaskProgress(task)
    completed += progress.completed
    total += progress.total
  }
  return { completed, total, percent: total === 0 ? 0 : Math.round((completed / total) * 100) }
}

/** Read-only search across task title, description and subtask titles. */
export function filterTasks(tasks: Task[], query: string): Task[] {
  const q = query.trim().toLowerCase()
  if (!q) return tasks
  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(q) ||
      task.description.toLowerCase().includes(q) ||
      task.subtasks.some((subtask) => subtask.title.toLowerCase().includes(q)),
  )
}
