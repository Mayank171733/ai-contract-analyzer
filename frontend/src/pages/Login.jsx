import { ArrowRight, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.15),_transparent_40%),linear-gradient(135deg,_#f8fbff,_#eef5ff)] px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden bg-gradient-to-br from-brand-600 via-brand-500 to-sky-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-3xl font-semibold">Analyze contracts with clarity.</h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-blue-100">Upload legal documents, uncover risks, and make faster decisions with AI-assisted review.</p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm text-blue-100">Trusted by modern legal and procurement teams</p>
          </div>
        </div>
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Welcome back</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Sign in to your workspace</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white" placeholder="you@company.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white" placeholder="••••••••" />
            </div>
            {error ? <p className="rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p> : null}
            {!error && loading ? <p className="rounded-2xl bg-blue-50 px-3 py-2 text-sm text-blue-700">Signing you in...</p> : null}
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-70">
              {loading ? 'Signing in...' : 'Login'}
              <ArrowRight size={18} />
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">Don&apos;t have an account? <Link to="/register" className="font-semibold text-brand-600">Create one</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login
