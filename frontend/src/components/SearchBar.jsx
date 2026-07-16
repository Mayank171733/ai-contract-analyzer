import { Search } from 'lucide-react'

const SearchBar = ({ value, onChange, placeholder = 'Search contracts...' }) => (
  <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
    <Search size={18} className="text-slate-400" />
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border-none bg-transparent text-sm outline-none"
    />
  </label>
)

export default SearchBar
