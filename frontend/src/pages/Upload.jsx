import { CheckCircle2, FileUp, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const Upload = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('contract', file)
      await api.post('/contracts/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 1200)
    } catch (err) {
      setError(err?.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar user={user} onLogout={() => { logout(); navigate('/login') }} />
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="flex-1">
          <div className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Upload contract</p>
                <h1 className="mt-2 text-2xl font-semibold text-slate-900">Add a new document for AI review</h1>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700">PDF</span>
                <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">DOCX</span>
              </div>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => { e.preventDefault(); setDragActive(false); setFile(e.dataTransfer.files[0]) }}
              className={`mt-8 rounded-[28px] border-2 border-dashed p-8 text-center transition ${dragActive ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-slate-50'}`}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm">
                <FileUp size={28} />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-900">Drag and drop your contract here</h2>
              <p className="mt-2 text-sm text-slate-500">Supports PDF and DOCX uploads with instant analysis preparation.</p>
              <label className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700">
                <Sparkles size={18} />
                Choose file
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
              </label>
            </div>

            {file ? (
              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{file.name}</p>
                    <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <div className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">Ready</div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-200">
                  <div className={`h-2 rounded-full bg-gradient-to-r from-brand-500 to-sky-500 transition-all ${uploading ? 'w-full' : 'w-3/4'}`} />
                </div>
              </div>
            ) : null}

            {error ? <p className="mt-4 rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p> : null}
            {uploading && !error ? <p className="mt-4 rounded-2xl bg-blue-50 px-3 py-2 text-sm text-blue-700">Uploading and preparing your analysis...</p> : null}
            {success ? (
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                <CheckCircle2 size={18} />
                Uploaded successfully. Redirecting...
              </div>
            ) : null}

            <button onClick={handleUpload} disabled={!file || uploading} className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-70">
              {uploading ? 'Uploading...' : 'Upload Contract'}
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Upload
