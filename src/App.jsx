import './MainStyle.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.js'
import Champions from './Pages/Champions.js'
import Items from './Pages/Items.js'
import MainNav from './components/MainNav.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/loldb' element={<MainNav/>}>
          <Route index element={<Home/>} />
          <Route path='/loldb/champions' element={<Champions/>} />
          <Route path='/loldb/items' element={<Items/>} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}