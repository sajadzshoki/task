import { toPersianDigits } from '../taskUtils'

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
        aria-label={`پیشرفت: ${toPersianDigits(completed)} از ${toPersianDigits(total)} انجام شده`}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-text">
        {toPersianDigits(completed)}/{toPersianDigits(total)} · {toPersianDigits(percent)}٪
      </span>
    </div>
  )
}
