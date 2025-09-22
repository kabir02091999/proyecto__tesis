import { useState } from 'react'

import {BrowserRouter as Router, Routes, Route } from 'react-router'

import {AuthProvider} from './context/AuthContext'

import Login from './pages/login'
import Inicion from './pages/Inicion'
import Administracion from './pages/adminitracion'

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
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
