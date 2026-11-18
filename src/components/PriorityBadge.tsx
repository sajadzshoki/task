import type { Priority } from '../types'

const labels: Record<Priority, string> = {
  high: 'زیاد',
  medium: 'متوسط',
  low: 'کم',
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={`priority-badge priority-${priority}`}>
      <span className="priority-dot" aria-hidden="true" />
      {labels[priority]}
    </span>
  )
}
