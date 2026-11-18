import type { Theme } from '../storage'
import { toPersianDigits, type Progress } from '../taskUtils'
import { MoonIcon, SunIcon } from './icons'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
  progress: Progress
}

export function Header({ theme, onToggleTheme, progress }: HeaderProps) {
  return (
    <header className="app-header">
      <h1 className="app-title">تسک‌های من</h1>
      <div className="header-right">
        {progress.total > 0 && (
          <div
            className="overall-progress"
            title={`${toPersianDigits(progress.completed)} از ${toPersianDigits(progress.total)} مورد انجام شده`}
          >
            <div className="overall-progress-bar">
              <div
                className="overall-progress-fill"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
            <span className="overall-progress-text">
              {toPersianDigits(progress.percent)}٪
            </span>
          </div>
        )}
        <button
          type="button"
          className="icon-button"
          onClick={onToggleTheme}
          aria-label={
            theme === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک'
          }
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  )
}
