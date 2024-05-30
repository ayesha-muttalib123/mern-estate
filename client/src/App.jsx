import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './componenets/Header'
import SignUp from './pages/SignUp'

export default function App() {
  return (
    
    <>
    <Header/>
    <Routes>
      <Route  path='/' element={<Home/>}/>
      <Route  path='/SignIn' element={<SignIn/>}/>
      <Route  path='/SignUp' element={<SignUp/>}/>
      <Route  path='/About' element={<About/>}/>
      <Route  path='/Profile' element={<Profile/>}/>
      

    </Routes>
    
    </>
  )
}
