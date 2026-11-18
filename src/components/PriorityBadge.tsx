import type { Priority } from '../types'

const labels: Record<Priority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={`priority-badge priority-${priority}`}>
      <span className="priority-dot" aria-hidden="true" />
      {labels[priority]}
    </span>
  )
}
