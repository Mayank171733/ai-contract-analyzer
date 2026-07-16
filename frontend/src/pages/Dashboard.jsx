import { BarChart3, Clock3, FilePlus2, Plus, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContractCard from '../components/ContractCard'
import EmptyState from '../components/EmptyState'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import Sidebar from '../components/Sidebar'
import StatsCard from '../components/StatsCard'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')

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

  useEffect(() => { fetchContracts() }, [])

  const filteredContracts = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase()
    return contracts.filter((contract) => {
      const matchesQuery = !normalizedQuery || contract.filename.toLowerCase().includes(normalizedQuery)
      const matchesStatus = statusFilter === 'all' || contract.status === statusFilter
      const riskScore = contract.analysis?.riskScore ?? 0
      let matchesRisk = true
      if (riskFilter === 'high') matchesRisk = riskScore >= 7
      if (riskFilter === 'medium') matchesRisk = riskScore >= 4 && riskScore < 7
      if (riskFilter === 'low') matchesRisk = riskScore < 4
      return matchesQuery && matchesStatus && matchesRisk
    })
  }, [contracts, search, statusFilter, riskFilter])

  const stats = useMemo(() => {
    const normalizedContracts = contracts.map((contract) => ({
      ...contract,
      isAnalyzed: contract.status === 'analyzed' || Boolean(contract.analysis?.riskScore || contract.analysis?.summary)
    }))

    const analyzedCount = normalizedContracts.filter((contract) => contract.isAnalyzed).length
    const pendingCount = normalizedContracts.length - analyzedCount
    const riskScores = normalizedContracts
      .filter((contract) => contract.isAnalyzed)
      .map((contract) => contract.analysis?.riskScore ?? 0)
    const averageRisk = riskScores.length ? (riskScores.reduce((sum, score) => sum + score, 0) / riskScores.length).toFixed(1) : '0.0'

    return [
      { title: 'Total Contracts', value: normalizedContracts.length, icon: FilePlus2, tone: 'bg-brand-50 text-brand-600' },
      { title: 'Analyzed Contracts', value: analyzedCount, icon: ShieldCheck, tone: 'bg-emerald-50 text-emerald-600' },
      { title: 'Pending Contracts', value: pendingCount, icon: Clock3, tone: 'bg-amber-50 text-amber-600' },
      { title: 'Average Risk Score', value: averageRisk, icon: BarChart3, tone: 'bg-slate-100 text-slate-700' }
    ]
  }, [contracts])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contracts/${id}`)
      setContracts((prev) => prev.filter((contract) => contract._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="flex-1">
          <section className="relative mb-8 overflow-hidden rounded-[36px] border border-brand-100 bg-gradient-to-br from-brand-600 via-blue-600 to-sky-500 p-8 text-white shadow-soft">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Workspace overview</p>
                <h1 className="mt-2 text-3xl font-semibold">Welcome back, {user?.name || 'there'}.</h1>
                <p className="mt-2 max-w-2xl text-sm text-blue-100">Review uploaded contracts, assess risk exposure, and keep your legal documents under control.</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-semibold">Next best action</p>
                <p className="mt-1 text-sm text-blue-100">Upload a new contract and let the AI surface the clauses that matter.</p>
              </div>
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="mt-8 rounded-[30px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Your contracts</h2>
                <p className="text-sm text-slate-500">Search and review documents in your workspace.</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <div className="w-full sm:min-w-[260px]">
                  <SearchBar value={search} onChange={setSearch} placeholder="Search by filename" />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 outline-none">
                  <option value="all">All status</option>
                  <option value="uploaded">Uploaded</option>
                  <option value="analyzed">Analyzed</option>
                  <option value="pending">Pending</option>
                </select>
                <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 outline-none">
                  <option value="all">All risks</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button onClick={() => navigate('/upload')} className="flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700">
                  <Plus size={18} />
                  Upload Contract
                </button>
              </div>
            </div>

            <div className="mt-6">
              {loading ? <Loading label="Loading your contracts..." /> : null}
              {!loading && filteredContracts.length === 0 ? (
                <EmptyState title="No contracts uploaded yet." subtitle="Upload a PDF or DOCX contract to start analyzing clauses and risks." />
              ) : null}
              {!loading && filteredContracts.length > 0 ? (
                <div className="grid gap-4 xl:grid-cols-2">
                  {filteredContracts.map((contract) => (
                    <ContractCard key={contract._id} contract={contract} onDelete={handleDelete} />
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

export default Dashboard
