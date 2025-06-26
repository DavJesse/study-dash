import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/auth'
import { LoginForm } from './components/login'
import { Dashboard } from './components/dashboard'
import { NotFound } from './components/not_found'

function App() {
  const { user, loading, isLoggedIn } = useAuth();
  
  if (loading) {
    return <div className="text-4xl text-gray-200 px-20">Checking Login Status...</div>
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
        isLoggedIn ? <Navigate to='/' replace /> : <LoginForm />
        }
        />

      <Route
        path='/'
        element={
          isLoggedIn ? <Dashboard /> : <Navigate to='/login' replace />
          }
          />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
