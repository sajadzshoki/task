import type { Task } from './types'

export const TASKS_STORAGE_KEY = 'personal-task-manager-v1'
export const THEME_STORAGE_KEY = 'personal-task-manager-theme-v1'

export type Theme = 'light' | 'dark'

function isSubtask(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'string' &&
    typeof v.title === 'string' &&
    typeof v.completed === 'boolean'
  )
}

function isTask(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'string' &&
    typeof v.title === 'string' &&
    typeof v.description === 'string' &&
    (v.priority === 'high' || v.priority === 'medium' || v.priority === 'low') &&
    typeof v.completed === 'boolean' &&
    typeof v.createdAt === 'number' &&
    typeof v.updatedAt === 'number' &&
    Array.isArray(v.subtasks) &&
    v.subtasks.every(isSubtask)
  )
}

/** Load tasks from localStorage. Returns an empty list on missing/invalid data. */
export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isTask)
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // Storage unavailable or full: keep the app running without persistence.
  }
}

export function loadTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    if (value === 'light' || value === 'dark') return value
  } catch {
    // ignore
  }
  return null
}

export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // ignore
  }
}
