import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LoginForm } from './components/login'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  )
}

export default App
