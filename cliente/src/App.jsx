import { useState } from 'react'

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {AuthProvider} from './context/AuthContext'

import Login from './pages/login'
import Inicion from './pages/Inicion'
import Administracion from './pages/adminitracion'
import Financiero from './pages/financiero'
import Inscri from './pages/inscri'

import ProtectedRoute from './pages/protectedRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Inicion/>}/>
          <Route path='/login' element={<Login/>}/>

          <Route element={<ProtectedRoute/>}>
            <Route path='/admin' element={<Administracion/>}/>
            <Route path='/catequesis' element={<Inscri/>}/>
            <Route path='/financiero' element={<Financiero/>}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
