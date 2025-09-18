import { useState } from 'react'

import {BrowserRouter as Router, Routes, Route } from 'react-router'

import Login from './pages/login'
import Inicion from './pages/Inicion'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Inicion/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
