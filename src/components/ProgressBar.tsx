interface ProgressBarProps {
  percent: number
  completed: number
  total: number
}

export function ProgressBar({ percent, completed, total }: ProgressBarProps) {
  return (
    <div className="progress">
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress: ${completed} of ${total} completed`}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-text">
        {completed}/{total} · {percent}%
      </span>
    </div>
  )
}
