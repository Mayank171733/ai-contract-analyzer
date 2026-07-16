import { LogOut, ShieldCheck, Sparkles, UserCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../services/api'

const Navbar = ({ user, onLogout }) => (
  <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <Link to="/dashboard" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-sky-500 text-white shadow-soft">
          <Sparkles size={18} />
        </div>
        <div>
          <p className="text-base font-semibold text-slate-900">AI Contract Analyzer</p>
          <p className="flex items-center gap-1 text-xs text-slate-500">
            <ShieldCheck size={12} className="text-brand-600" />
            Secure • AI-assisted review
          </p>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <Link to="/profile" className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
          {user?.profilePhoto ? (
            <img src={getImageUrl(user.profilePhoto)} alt="Profile" className="h-7 w-7 rounded-full object-cover" />
          ) : (
            <UserCircle2 size={18} className="text-brand-600" />
          )}
          <span className="text-sm font-medium text-slate-700">{user?.name || 'User'}</span>
        </Link>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  </header>
)

export default Navbar
