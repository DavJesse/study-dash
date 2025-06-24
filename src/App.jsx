import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/auth'
import { LoginForm } from './components/login'
import { Dashboard } from './components/dashboard'
import { NotFound } from './components/not_found'

function App() {
  const { user, loading, isLoggedIn } = useAuth();
  if (loading) {
    return <div>Checking Login Status...</div>
  }
  console.log('User: ', user)
  console.log('Loading: ', loading)  
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
          isLoggedIn ? <Navigate to='/login' replace /> : <Dashboard />
          }
          />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
