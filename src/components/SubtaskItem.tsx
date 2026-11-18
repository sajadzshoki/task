import { useState } from 'react'
import type { Subtask } from '../types'
import { CheckIcon, EditIcon, TrashIcon } from './icons'

interface SubtaskItemProps {
  subtask: Subtask
  onToggle: () => void
  onEdit: (title: string) => void
  onDelete: () => void
}

export function SubtaskItem({ subtask, onToggle, onEdit, onDelete }: SubtaskItemProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(subtask.title)

  const startEditing = () => {
    setDraft(subtask.title)
    setEditing(true)
  }

  const commit = () => {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== subtask.title) {
      onEdit(trimmed)
    }
    setEditing(false)
  }

  const cancel = () => {
    setDraft(subtask.title)
    setEditing(false)
  }

  return (
    <li className={`subtask${subtask.completed ? ' subtask-completed' : ''}`}>
      {editing ? (
        <input
          className="subtask-input subtask-input-editing"
          value={draft}
          autoFocus
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === 'Enter') commit()
            if (event.key === 'Escape') cancel()
          }}
          aria-label="عنوان زیرتسک"
        />
      ) : (
        <>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={onToggle}
              aria-label={
                subtask.completed
                  ? `علامت کردن «${subtask.title}» به‌عنوان فعال`
                  : `علامت کردن «${subtask.title}» به‌عنوان انجام‌شده`
              }
            />
            <span className="checkbox-box" aria-hidden="true">
              {subtask.completed && <CheckIcon size={12} />}
            </span>
          </label>
          <span className="subtask-title">{subtask.title}</span>
          <div className="item-actions">
            <button
              type="button"
              className="icon-button icon-button-small"
              onClick={startEditing}
              aria-label={`ویرایش زیرتسک «${subtask.title}»`}
            >
              <EditIcon size={14} />
            </button>
            <button
              type="button"
              className="icon-button icon-button-small icon-button-danger"
              onClick={onDelete}
              aria-label={`حذف زیرتسک «${subtask.title}»`}
            >
              <TrashIcon size={14} />
            </button>
          </div>
        </>
      )}
    </li>
  )
}
