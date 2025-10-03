import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { PoblacionProvider } from './context/PoblacionContext' // Lo necesitamos

import Login from './pages/login'
import Inicion from './pages/Inicion'
import Administracion from './pages/adminitracion'
import Financiero from './pages/financiero'
import Inscri from './pages/inscri'
import Buscar_poblacion from './pages/buscar_poblacion'
import Crear_poblacion from './pages/crear_poblacion'
import Crear_lapso from './pages/Crear_lapso'

import ProtectedRoute from './pages/protectedRoute'

function App() {
  // El useState(0) no se usa, lo puedes dejar o quitar.
  const [count, setCount] = useState(0) 

  return (
    // 1. AuthProvider envuelve todo, ya que la autenticación se usa en ProtectedRoute
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas Públicas */}
          <Route path='/' element={<Inicion />} />
          <Route path='/login' element={<Login />} />

          {/* 2. Rutas Protegidas: ProtectedRoute actúa como layout/padre */}
          <Route element={<ProtectedRoute />}>
            
            
            <Route path='/admin' element={
              <PoblacionProvider>
                <Administracion />
              </PoblacionProvider>
            } />
            
            <Route path='/catequesis' element={
              <PoblacionProvider>
                <Inscri />
              </PoblacionProvider>
            } />

            <Route path='/catequesis/buscar-poblacion' element={
              <PoblacionProvider>
                <Buscar_poblacion />
              </PoblacionProvider>}/>
              <Route path='/catequesis/crear-poblacion' element={
              <PoblacionProvider>
                <Crear_poblacion />
              </PoblacionProvider>}/>

              <Route path='/catequesis/crear-lapso' element={
              <PoblacionProvider>
                <Crear_lapso />
              </PoblacionProvider>}/>
            
            <Route path='/financiero' element={
              <PoblacionProvider>
                <Financiero />
              </PoblacionProvider>
            } />
            
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
