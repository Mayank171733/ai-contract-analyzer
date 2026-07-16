import { FileText, Search as SearchIcon, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContractCard from '../components/ContractCard'
import EmptyState from '../components/EmptyState'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const SearchPage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await api.get('/contracts')
        setContracts(response.data.contracts || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchContracts()
  }, [])

  const filteredContracts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return contracts

    return contracts.filter((contract) => {
      const filename = contract.filename?.toLowerCase() || ''
      const summary = contract.analysis?.summary?.toLowerCase() || ''
      const status = contract.status?.toLowerCase() || ''
      return filename.includes(normalizedQuery) || summary.includes(normalizedQuery) || status.includes(normalizedQuery)
    })
  }, [contracts, query])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contracts/${id}`)
      setContracts((prev) => prev.filter((contract) => contract._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar user={user} onLogout={() => { logout(); navigate('/login') }} />
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="flex-1">
          <section className="relative mb-8 overflow-hidden rounded-[36px] border border-violet-100 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-sky-500 p-8 text-white shadow-soft">
            <div className="absolute -left-8 top-0 h-36 w-36 rounded-full bg-white/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-100">Search workspace</p>
                <h1 className="mt-2 text-3xl font-semibold">Find contracts in seconds</h1>
                <p className="mt-2 max-w-2xl text-sm text-violet-100">Search by filename, status, or AI-generated findings to jump directly to the document you need.</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <SearchIcon size={16} />
                  Intelligent contract lookup
                </div>
                <p className="mt-1 text-sm text-violet-100">Fast access to review-ready documents.</p>
              </div>
            </div>
          </section>

          <div className="rounded-[30px] border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Search your contract library</h2>
                <p className="text-sm text-slate-500">Type a filename, risk theme, or status to narrow results instantly.</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <div className="w-full sm:min-w-[320px]">
                  <SearchBar value={query} onChange={setQuery} placeholder="Search contracts or findings" />
                </div>
                <button onClick={() => setQuery('')} className="rounded-2xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
                  Clear
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">{filteredContracts.length} results</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{contracts.length} total contracts</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700"><span className="mr-1 inline-flex items-center"><ShieldCheck size={14} /></span>Ready for review</span>
            </div>

            <div className="mt-6">
              {loading ? <Loading label="Loading your contract library..." /> : null}
              {!loading && filteredContracts.length === 0 ? (
                <EmptyState title="No matches found." subtitle="Try a different filename, status, or contract keyword." />
              ) : null}
              {!loading && filteredContracts.length > 0 ? (
                <div className="grid gap-4 xl:grid-cols-2">
                  {filteredContracts.map((contract) => (
                    <div key={contract._id} className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl bg-white p-3 text-brand-600 shadow-sm">
                          <FileText size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-800">{contract.filename}</p>
                          <p className="mt-1 text-sm text-slate-500">{contract.analysis?.summary || 'Review details available after analysis.'}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <ContractCard contract={contract} onDelete={handleDelete} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SearchPage
