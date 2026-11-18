export type Priority = 'high' | 'medium' | 'low'

export interface Subtask {
  id: string
  title: string
  completed: boolean
}

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  completed: boolean
  createdAt: number
  updatedAt: number
  subtasks: Subtask[]
}

/** Fields editable through the task form. */
export interface TaskDraft {
  title: string
  description: string
  priority: Priority
}
