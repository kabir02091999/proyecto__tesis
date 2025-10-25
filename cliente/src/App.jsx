import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { PoblacionProvider } from './context/PoblacionContext' // Lo necesitamos
import { FinancieroProvider  } from './context/finacieroContext' // Lo necesitamos

//paginas
import Login from './pages/login'
import Inicion from './pages/Inicion'
import Administracion from './pages/adminitracion'
import Financiero from './pages/financiero/financiero'
import Inscri from './pages/inscri'
import Buscar_poblacion from './pages/buscar_poblacion'
import Crear_poblacion from './pages/crear_poblacion'
import Crear_lapso from './pages/Crear_lapso'
import Poblacion_Lapso from './pages/Poblacion_Lapso'
import Calendario_liturgico from './pages/Calendario_liturgico'
import Buscar_finansa from './components/financiero/Buscar_finansa'

import ProtectedRoute from './pages/protectedRoute'
import Aprobacion_Reprobacion from './pages/Aprobacion_Reprobacion'
import Progreso_estudiante from './pages/Progreso_estudiante'
import InscripcionPDF from './pages/inscricionpdf'
import Inscricion from './pages/inicio/inscricion'

import ContenidoConfiguracion from '../src/components/contenido/Contenido'

import Reporte from './pages/inicio/Reporte'
import Reginstrar_Transacciones from './pages/financiero/Registrar_Transaccion'
import Reporte_finaciero from './pages/financiero/Reporte_finaciero'
import Contenido from './pages/contenido/contenido'
import Subida from './pages/contenido/subida'
import Paguina from './components/contenido/Paguina'
import CalendarioPageCon from './pages/contenido/CalendarioPageCon'
import CalendarioPageFin from './pages/financiero/calendarioPageFin'

function App() {

  return (
    // 1. AuthProvider envuelve todo, ya que la autenticación se usa en ProtectedRoute
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas Públicas */}
          <Route path='/' element={<Inicion />} />
          <Route path='/login' element={<Login />} />
          <Route path='/inscripcion' element={<Inscricion/>} />
          <Route path='/reportes' element={<Reporte/>} />

          {/* <Route path='/prueva1234' element={ <Paguina/> } /> */}

          {/* 2. Rutas Protegidas: ProtectedRoute actúa como layout/padre */}
          <Route element={<ProtectedRoute />}>
            
            
            <Route path='/admin' element={
              <PoblacionProvider>
                <Administracion />
              </PoblacionProvider>
            } />
            {/* ojo aqui kabir vamos a trata de poner los reporde poblacion en todas usuarios */}

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
            
              
              <Route path='/catequesis/incribir-poblacion-lapso' element={
                <PoblacionProvider>
                  <Poblacion_Lapso />
                </PoblacionProvider>}/>

              <Route path='/catequesis/aprobacion-reprobacion' element={
                <PoblacionProvider>
                  <Aprobacion_Reprobacion />
                </PoblacionProvider>}/>
              
              <Route path='/catequesis/Post-calendario-liturgico' element={
                <PoblacionProvider>
                  <Calendario_liturgico/>
                </PoblacionProvider>}/>

              <Route path='/catequesis/progreso-estudiante' element={
                <PoblacionProvider>
                  <Progreso_estudiante/>
                </PoblacionProvider>}/>
              
              <Route path='/catequesis/pdf' element={
                <PoblacionProvider>
                  <InscripcionPDF/>
                </PoblacionProvider>}/>

            <Route path='/financiero' element={
              <FinancieroProvider>
                <Financiero />
              </FinancieroProvider>
            } />

            <Route path='/financiero/registrar-transacciones' element={
              <FinancieroProvider>
                <Reginstrar_Transacciones/>
              </FinancieroProvider>
            } />
            {/* ojo aqui */}
            <Route path='/financiero/reportes' element={
              <FinancieroProvider>
                <Reporte_finaciero/>
              </FinancieroProvider>
            } />
            {/* ojo aqui */}
            <Route path='/financiero/buscar' element={
              <FinancieroProvider>
                <Buscar_finansa/>
              </FinancieroProvider>
            } />

            <Route path='/financiero/Post-calendario-liturgico' element={
              <CalendarioPageFin/>
            } />
          
            <Route path='/contenido' element={
              <PoblacionProvider>
                <Contenido/>
              </PoblacionProvider>
            } />

            <Route path='/contenido/Post-calendario-liturgico' element={

                <CalendarioPageCon/>
                             
            } />

            <Route path='/contenido/subida' element={
              <PoblacionProvider>
                <Subida/>
              </PoblacionProvider>
            } />

            <Route path='/contenido/paguina' element={
                < ContenidoConfiguracion/>             
            } />

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
