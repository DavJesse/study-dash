import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LoginForm } from './components/login'
import { Dashboard } from './components/dashboard'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path='/' element={<Dashboard />} />
    </Routes>
  )
}

export default App
