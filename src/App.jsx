import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout"
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
           
            <Route path='/home' element={<Home />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Login />}>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
