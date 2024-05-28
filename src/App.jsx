import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignOut from './pages/SignOut'
import About from './pages/About'
import Profile from './pages/Profile'

export default function App() {
  return (
    
    <Routes>
      <Route  path='/' element={<Home/>}/>
      <Route  path='/SignIn' element={<SignIn/>}/>
      <Route  path='/SignOut' element={<SignOut/>}/>
      <Route  path='/About' element={<About/>}/>
      <Route  path='/Profile' element={<Profile/>}/>
      

    </Routes>
  )
}
