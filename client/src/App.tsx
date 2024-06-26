import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Auth from './pages/auth'
import { FinancialRecordsProvider } from './context/financial-record-context'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<FinancialRecordsProvider><Dashboard /></FinancialRecordsProvider>} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
