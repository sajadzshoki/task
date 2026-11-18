import type { Theme } from '../storage'
import type { Progress } from '../taskUtils'
import { MoonIcon, SunIcon } from './icons'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
  progress: Progress
}

export function Header({ theme, onToggleTheme, progress }: HeaderProps) {
  return (
    <header className="app-header">
      <h1 className="app-title">My Tasks</h1>
      <div className="header-right">
        {progress.total > 0 && (
          <div
            className="overall-progress"
            title={`${progress.completed} of ${progress.total} items completed`}
          >
            <div className="overall-progress-bar">
              <div
                className="overall-progress-fill"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
            <span className="overall-progress-text">{progress.percent}%</span>
          </div>
        )}
        <button
          type="button"
          className="icon-button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  )
}
