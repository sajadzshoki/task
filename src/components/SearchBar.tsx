import { SearchIcon, XIcon } from './icons'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <SearchIcon size={16} />
      <input
        type="text"
        placeholder="جستجوی تسک‌ها..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="جستجوی تسک‌ها"
      />
      {value !== '' && (
        <button
          type="button"
          className="icon-button icon-button-small"
          onClick={() => onChange('')}
          aria-label="پاک کردن جستجو"
        >
          <XIcon size={14} />
        </button>
      )}
    </div>
  )
}
