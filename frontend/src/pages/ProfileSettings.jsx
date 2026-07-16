import { Camera, Save, UserCircle2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import api, { getImageUrl } from '../services/api'

const ProfileSettings = () => {
  const { user, logout, updateProfile, updateUser } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name || '')
  const [photoUrl, setPhotoUrl] = useState(user?.profilePhoto || '')
  const [selectedFile, setSelectedFile] = useState(null)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const preview = useMemo(() => getImageUrl(photoUrl || ''), [photoUrl])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setMessageType('success')

    try {
      const hasPasswordChange = currentPassword.trim() || newPassword.trim() || confirmPassword.trim()

      if (hasPasswordChange) {
        if (!currentPassword || !newPassword || !confirmPassword) {
          throw new Error('Please fill in all password fields')
        }
        if (newPassword.length < 6) {
          throw new Error('New password must be at least 6 characters')
        }
        if (newPassword !== confirmPassword) {
          throw new Error('New password and confirmation do not match')
        }
      }

      let result = null
      if (selectedFile) {
        const formData = new FormData()
        formData.append('photo', selectedFile)
        const response = await api.patch('/auth/profile/photo', formData)
        result = response.data
        if (response.data.user?.profilePhoto) {
          const normalizedPhoto = getImageUrl(response.data.user.profilePhoto)
          setPhotoUrl(normalizedPhoto)
          updateUser(response.data.user)
        }
      }

      if (name !== user?.name) {
        result = await updateProfile({ name, profilePhoto: photoUrl })
      }

      if (hasPasswordChange) {
        result = await api.patch('/auth/profile/password', {
          currentPassword,
          newPassword,
          confirmPassword
        })
      }

      setMessage(result?.data?.message || result?.message || 'Profile updated successfully')
    } catch (error) {
      setMessageType('error')
      setMessage(error?.response?.data?.message || error?.message || 'Unable to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar user={user} onLogout={() => { logout(); navigate('/login') }} />
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="flex-1">
          <div className="rounded-[36px] border border-slate-200 bg-white/90 p-8 shadow-sm sm:p-10">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Profile settings</p>
              <h1 className="text-3xl font-semibold text-slate-900">Update your account details</h1>
              <p className="text-sm text-slate-500">Change your display name, upload a profile photo, or update your password.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-center">
                <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
                  {preview ? (
                    <img src={preview} alt="Profile preview" className="h-full w-full object-cover" />
                  ) : (
                    <UserCircle2 size={56} className="text-slate-400" />
                  )}
                </div>
                <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white p-3 text-sm font-medium text-slate-600 transition hover:border-brand-500 hover:text-brand-600">
                  <Camera size={16} />
                  Choose a photo
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                </label>
                <p className="mt-2 text-xs text-slate-500">PNG, JPG, or WEBP up to 2 MB.</p>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                <label className="block text-sm font-medium text-slate-700">
                  Full name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500 focus:bg-white"
                    placeholder="Enter your name"
                  />
                </label>

                <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <h2 className="text-sm font-semibold text-slate-800">Change password</h2>
                  <p className="mt-1 text-sm text-slate-500">Leave these blank if you do not want to change your password.</p>
                  <div className="mt-4 grid gap-3">
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500"
                      placeholder="Current password"
                    />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500"
                      placeholder="New password"
                    />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                {message ? (
                  <div className={`mt-5 rounded-2xl border px-3 py-2 text-sm ${messageType === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                    {message}
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-70">
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Save changes'}
                  </button>
                  <button type="button" onClick={() => navigate('/dashboard')} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProfileSettings
