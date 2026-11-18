import { useState } from 'react'
import type { Task } from '../types'
import { getTaskProgress } from '../taskUtils'
import { PriorityBadge } from './PriorityBadge'
import { ProgressBar } from './ProgressBar'
import { SubtaskItem } from './SubtaskItem'
import { CheckIcon, ChevronDownIcon, EditIcon, PlusIcon, TrashIcon } from './icons'

interface TaskItemProps {
  task: Task
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
  onAddSubtask: (title: string) => void
  onToggleSubtask: (subtaskId: string) => void
  onEditSubtask: (subtaskId: string, title: string) => void
  onDeleteSubtask: (subtaskId: string) => void
}

export function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  onAddSubtask,
  onToggleSubtask,
  onEditSubtask,
  onDeleteSubtask,
}: TaskItemProps) {
  const [expanded, setExpanded] = useState(false)
  const [newSubtask, setNewSubtask] = useState('')
  const progress = getTaskProgress(task)

  const submitNewSubtask = () => {
    const title = newSubtask.trim()
    if (!title) return
    onAddSubtask(title)
    setNewSubtask('')
    setExpanded(true)
  }

  return (
    <li className={`task-item${task.completed ? ' task-completed' : ''}`}>
      <div className="task-main">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
            aria-label={
              task.completed
                ? `علامت کردن «${task.title}» به‌عنوان فعال`
                : `علامت کردن «${task.title}» به‌عنوان انجام‌شده`
            }
          />
          <span className="checkbox-box" aria-hidden="true">
            {task.completed && <CheckIcon size={14} />}
          </span>
        </label>

        <div className="task-content">
          <div className="task-row">
            <span className="task-title">{task.title}</span>
            <PriorityBadge priority={task.priority} />
          </div>
          <ProgressBar
            percent={progress.percent}
            completed={progress.completed}
            total={progress.total}
          />
        </div>

        <div className="item-actions">
          <button
            type="button"
            className="icon-button icon-button-small"
            onClick={onEdit}
            aria-label={`ویرایش تسک «${task.title}»`}
          >
            <EditIcon size={14} />
          </button>
          <button
            type="button"
            className="icon-button icon-button-small icon-button-danger"
            onClick={onDelete}
            aria-label={`حذف تسک «${task.title}»`}
          >
            <TrashIcon size={14} />
          </button>
          <button
            type="button"
            className={`icon-button icon-button-small chevron${expanded ? ' chevron-open' : ''}`}
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-label={expanded ? 'پنهان کردن زیرتسک‌ها' : 'نمایش زیرتسک‌ها'}
          >
            <ChevronDownIcon size={16} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="task-details">
          {task.description ? (
            <p className="task-description">{task.description}</p>
          ) : (
            <p className="task-description task-description-empty">بدون توضیحات</p>
          )}

          {task.subtasks.length > 0 && (
            <ul className="subtask-list">
              {task.subtasks.map((subtask) => (
                <SubtaskItem
                  key={subtask.id}
                  subtask={subtask}
                  onToggle={() => onToggleSubtask(subtask.id)}
                  onEdit={(title) => onEditSubtask(subtask.id, title)}
                  onDelete={() => onDeleteSubtask(subtask.id)}
                />
              ))}
            </ul>
          )}

          <div className="subtask-add">
            <PlusIcon size={14} />
            <input
              type="text"
              placeholder="افزودن زیرتسک..."
              value={newSubtask}
              onChange={(event) => setNewSubtask(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') submitNewSubtask()
              }}
              aria-label={`افزودن زیرتسک به «${task.title}»`}
            />
            <button
              type="button"
              className="button button-small"
              onClick={submitNewSubtask}
              disabled={newSubtask.trim() === ''}
            >
              افزودن
            </button>
          </div>
        </div>
      )}
    </li>
  )
}
