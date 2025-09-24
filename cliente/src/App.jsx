import { useState } from 'react'

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {AuthProvider} from './context/AuthContext'

import Login from './pages/login'
import Inicion from './pages/Inicion'
import Administracion from './pages/adminitracion'
import Financiero from './pages/financiero'

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
            <Route path='/inscri' element={<h2>inscricion</h2>}/>
            <Route path='/financiero' element={<Financiero/>}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
