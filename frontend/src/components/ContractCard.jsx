import { Eye, FileText, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const statusStyles = {
  uploaded: 'bg-slate-100 text-slate-700',
  analyzed: 'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700'
}

const ContractCard = ({ contract, onDelete }) => {
  const created = new Date(contract.createdAt).toLocaleDateString()
  const status = contract.status || 'uploaded'
  const risk = contract.analysis?.riskScore ?? null

  return (
    <div className="animate-fade-in card-sheen rounded-[26px] border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-brand-50 p-3 text-brand-600">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">{contract.filename}</h3>
            <p className="mt-1 text-sm text-slate-500">Uploaded {created}</p>
          </div>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[status] || statusStyles.uploaded}`}>
          {status}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {risk !== null ? (
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">Risk {risk}/10</span>
        ) : (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Not analyzed yet</span>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          to={`/analysis/${contract._id}`}
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <Eye size={16} />
          View Analysis
        </Link>
        <button
          onClick={() => onDelete(contract._id)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  )
}

export default ContractCard
