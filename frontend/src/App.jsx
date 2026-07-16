import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Analysis from './pages/Analysis'
import Search from './pages/Search'
import ProfileSettings from './pages/ProfileSettings'
import Loading from './components/Loading'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) return <Loading label="Preparing your workspace..." />
  return user ? children : <Navigate to="/login" replace />
}

const AppContent = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
    <Route path="/analysis/:id" element={<ProtectedRoute><Analysis /></ProtectedRoute>} />
    <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
)

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
)

export default App
