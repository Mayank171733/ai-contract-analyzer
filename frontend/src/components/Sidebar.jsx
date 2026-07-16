import { FileText, LayoutGrid, PlusCircle, Search } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/upload', label: 'Upload', icon: PlusCircle },
  { to: '/analysis', label: 'Analysis', icon: FileText },
  { to: '/search', label: 'Search', icon: Search }
]

const Sidebar = () => (
  <aside className="hidden w-72 shrink-0 lg:block">
    <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm card-sheen">
      <p className="text-sm font-semibold text-slate-900">Workspace</p>
      <p className="mt-1 text-sm text-slate-500">Organize contracts and insights in one place.</p>
      <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50 p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Next step</p>
        <p className="mt-1 text-sm text-slate-700">Upload a contract and let the platform highlight the critical clauses.</p>
      </div>
    </div>
    <nav className="mt-4 space-y-2">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${isActive ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
)

export default Sidebar
