import { ArrowLeft, CheckCircle2, Download, FileText, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const riskPalette = {
  low: 'bg-emerald-50 text-emerald-700',
  medium: 'bg-amber-50 text-amber-700',
  high: 'bg-red-50 text-red-700'
}

const Analysis = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [contract, setContract] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractRes = await api.get(`/contracts/${id}`)
        setContract(contractRes.data.contract)
        const analysisRes = await api.get(`/analysis/${id}`)
        setAnalysis(analysisRes.data.analysis)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const riskScore = analysis?.riskScore ?? 0
  const riskLevel = useMemo(() => {
    if (riskScore >= 7) return 'high'
    if (riskScore >= 4) return 'medium'
    return 'low'
  }, [riskScore])

  const handleAnalyze = async () => {
    setAnalyzing(true)
    try {
      const response = await api.post(`/analysis/${id}`)
      setAnalysis(response.data.analysis)
    } catch (error) {
      console.error(error)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleDownloadReport = () => {
    const summary = analysis?.summary || 'No summary available.'
    const clauses = (analysis?.clauses || []).map((item) => `- ${item.name}: ${item.description}`).join('\n')
    const risks = (analysis?.risks || []).map((item) => `- ${item.severity}: ${item.description}`).join('\n')
    const recommendations = (analysis?.recommendations || []).map((item) => `- ${item.description}`).join('\n')
    const content = [
      `Contract: ${contract?.filename || 'Contract review'}`,
      `Risk Score: ${riskScore}/10`,
      '',
      'Summary',
      summary,
      '',
      'Important Clauses',
      clauses,
      '',
      'Risks',
      risks,
      '',
      'Recommendations',
      recommendations
    ].join('\n')

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${(contract?.filename || 'contract').replace(/\.[^/.]+$/, '')}-analysis.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (loading) return <div className="min-h-screen bg-transparent"><Navbar user={user} onLogout={() => { logout(); navigate('/login') }} /><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><Loading label="Analyzing contract insights..." /></div></div>

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar user={user} onLogout={() => { logout(); navigate('/login') }} />
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="flex-1">
          <div className="rounded-[36px] border border-brand-100 bg-gradient-to-br from-white via-slate-50 to-brand-50 p-8 shadow-sm sm:p-10">
            <button onClick={() => navigate('/dashboard')} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <ArrowLeft size={16} />
              Back to dashboard
            </button>
            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Contract analysis</p>
                <h1 className="mt-2 text-2xl font-semibold text-slate-900">{contract?.filename || 'Contract review'}</h1>
                <p className="mt-1 text-sm text-slate-500">Uploaded on {contract ? new Date(contract.createdAt).toLocaleDateString() : ''}</p>
              </div>
              <button onClick={handleAnalyze} disabled={analyzing} className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-70">
                <Sparkles size={18} />
                {analyzing ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white p-3 text-brand-600 shadow-sm">
                    <ShieldAlert size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Risk score</p>
                    <p className="text-3xl font-semibold text-slate-900">{riskScore}/10</p>
                  </div>
                </div>
                <div className="mt-6 h-3 w-full rounded-full bg-slate-200">
                  <div className={`h-3 rounded-full ${riskLevel === 'high' ? 'bg-red-500' : riskLevel === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, riskScore * 10)}%` }} />
                </div>
                <p className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold capitalize ${riskPalette[riskLevel]}`}>{riskLevel} risk</p>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-brand-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Summary</h2>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{analysis?.summary || 'The contract review will appear here once the analysis is available.'}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">{(analysis?.clauses || []).length} clauses</span>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">{(analysis?.risks || []).length} risks</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">{(analysis?.recommendations || []).length} recommendations</span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <FileText size={20} className="text-brand-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Important clauses</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {(analysis?.clauses || []).map((clause, index) => (
                    <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-sm font-semibold text-slate-900">{clause.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{clause.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={20} className="text-red-500" />
                  <h3 className="text-lg font-semibold text-slate-900">Risks</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {(analysis?.risks || []).map((risk, index) => (
                    <div key={index} className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-sm text-slate-700">{risk.description}</p>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${riskPalette[risk.severity?.toLowerCase()] || 'bg-slate-100 text-slate-700'}`}>{risk.severity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-emerald-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Recommendations</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {(analysis?.recommendations || []).map((item, index) => (
                    <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">{item.description}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={handleDownloadReport} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
                <Download size={18} />
                Download report
              </button>
              <button onClick={() => navigate('/dashboard')} className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700">
                Back to dashboard
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Analysis
