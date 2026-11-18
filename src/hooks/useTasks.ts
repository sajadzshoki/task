import { useCallback, useEffect, useState } from 'react'
import type { Task, TaskDraft } from '../types'
import { createId } from '../taskUtils'
import { loadTasks, saveTasks } from '../storage'

/**
 * Central task state. Every mutation is immutable and persisted to
 * localStorage through the effect below.
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = useCallback((draft: TaskDraft) => {
    const now = Date.now()
    const task: Task = {
      id: createId(),
      title: draft.title.trim(),
      description: draft.description.trim(),
      priority: draft.priority,
      completed: false,
      createdAt: now,
      updatedAt: now,
      subtasks: [],
    }
    setTasks((prev) => [task, ...prev])
  }, [])

  const updateTask = useCallback((id: string, draft: TaskDraft) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              title: draft.title.trim(),
              description: draft.description.trim(),
              priority: draft.priority,
              updatedAt: Date.now(),
            }
          : task,
      ),
    )
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  /** Toggles only the task itself; subtasks are left untouched. */
  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: Date.now() }
          : task,
      ),
    )
  }, [])

  const addSubtask = useCallback((taskId: string, title: string) => {
    const trimmed = title.trim()
    if (!trimmed) return
    const subtask = { id: createId(), title: trimmed, completed: false }
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, subtasks: [...task.subtasks, subtask], updatedAt: Date.now() }
          : task,
      ),
    )
  }, [])

  const updateSubtask = useCallback((taskId: string, subtaskId: string, title: string) => {
    const trimmed = title.trim()
    if (!trimmed) return
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId ? { ...subtask, title: trimmed } : subtask,
              ),
              updatedAt: Date.now(),
            }
          : task,
      ),
    )
  }, [])

  const deleteSubtask = useCallback((taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter((subtask) => subtask.id !== subtaskId),
              updatedAt: Date.now(),
            }
          : task,
      ),
    )
  }, [])

  /** Toggles only the subtask; the parent task is left untouched. */
  const toggleSubtask = useCallback((taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask,
              ),
              updatedAt: Date.now(),
            }
          : task,
      ),
    )
  }, [])

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    toggleSubtask,
  }
}
