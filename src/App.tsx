import { useMemo, useState } from 'react'
import type { Task, TaskDraft } from './types'
import { useTasks } from './hooks/useTasks'
import { useTheme } from './hooks/useTheme'
import { filterTasks, getOverallProgress } from './taskUtils'
import { Header } from './components/Header'
import { SearchBar } from './components/SearchBar'
import { TaskItem } from './components/TaskItem'
import { TaskFormModal } from './components/TaskFormModal'
import { EmptyState } from './components/EmptyState'
import { PlusIcon } from './components/icons'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    toggleSubtask,
  } = useTasks()

  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const visibleTasks = useMemo(() => filterTasks(tasks, query), [tasks, query])
  const overallProgress = useMemo(() => getOverallProgress(tasks), [tasks])

  const openCreateModal = () => {
    setEditingTask(null)
    setModalOpen(true)
  }

  const openEditModal = (task: Task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingTask(null)
  }

  const handleSubmit = (draft: TaskDraft) => {
    if (editingTask) {
      updateTask(editingTask.id, draft)
    } else {
      addTask(draft)
    }
    closeModal()
  }

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} progress={overallProgress} />

      <main className="app-main">
        <div className="toolbar">
          <SearchBar value={query} onChange={setQuery} />
          <button type="button" className="button button-primary" onClick={openCreateModal}>
            <PlusIcon size={16} />
            <span>افزودن تسک</span>
          </button>
        </div>

        {tasks.length === 0 ? (
          <EmptyState
            title="هنوز تسکی ثبت نکردی"
            message="برای شروع، اولین تسک را ایجاد کن."
          />
        ) : visibleTasks.length === 0 ? (
          <EmptyState
            title="تسکی یافت نشد"
            message={`عبارت «${query}» نتیجه‌ای نداشت؛ عبارت دیگری را جستجو کن.`}
          />
        ) : (
          <ul className="task-list">
            {visibleTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
                onEdit={() => openEditModal(task)}
                onDelete={() => deleteTask(task.id)}
                onAddSubtask={(title) => addSubtask(task.id, title)}
                onToggleSubtask={(subtaskId) => toggleSubtask(task.id, subtaskId)}
                onEditSubtask={(subtaskId, title) => updateSubtask(task.id, subtaskId, title)}
                onDeleteSubtask={(subtaskId) => deleteSubtask(task.id, subtaskId)}
              />
            ))}
          </ul>
        )}
      </main>

      {modalOpen && <TaskFormModal task={editingTask} onClose={closeModal} onSubmit={handleSubmit} />}
    </div>
  )
}
