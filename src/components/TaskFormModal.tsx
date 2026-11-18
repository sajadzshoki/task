import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Priority, Task, TaskDraft } from '../types'
import { XIcon } from './icons'

interface TaskFormModalProps {
  /** The task being edited, or null when creating a new task. */
  task: Task | null
  onClose: () => void
  onSubmit: (draft: TaskDraft) => void
}

const priorities: { value: Priority; label: string }[] = [
  { value: 'low', label: 'کم' },
  { value: 'medium', label: 'متوسط' },
  { value: 'high', label: 'زیاد' },
]

export function TaskFormModal({ task, onClose, onSubmit }: TaskFormModalProps) {
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [priority, setPriority] = useState<Priority>(task?.priority ?? 'medium')
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const canSubmit = title.trim() !== ''

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!canSubmit) return
    onSubmit({ title, description, priority })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-heading"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="task-form-heading">{task ? 'ویرایش تسک' : 'تسک جدید'}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="بستن">
            <XIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="field">
            <span className="field-label">عنوان</span>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="چه کاری باید انجام شود؟"
              maxLength={200}
            />
          </label>

          <label className="field">
            <span className="field-label">
              توضیحات <span className="field-optional">(اختیاری)</span>
            </span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              placeholder="جزئیات بیشتر..."
              maxLength={2000}
            />
          </label>

          <div className="field">
            <span className="field-label">اولویت</span>
            <div className="priority-options" role="radiogroup" aria-label="اولویت">
              {priorities.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={priority === value}
                  className={`priority-option priority-option-${value}${
                    priority === value ? ' priority-option-active' : ''
                  }`}
                  onClick={() => setPriority(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="button button-secondary" onClick={onClose}>
              انصراف
            </button>
            <button type="submit" className="button button-primary" disabled={!canSubmit}>
              {task ? 'ذخیره تغییرات' : 'ایجاد تسک'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
