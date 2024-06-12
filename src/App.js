import './MainStyle.css';
import React from 'react'
import {createHashRouter, RouterProvider, HashRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home.js';
import Champions from './Pages/Champions.js';
import Items from './Pages/Items.js';
import MainNav from './components/MainNav.js'
import Footer from './components/Footer.js'

const router = createHashRouter([
  {path:"/", element: <Home/>},
  {path:"/champions", element: <Champions/>},
  {path:"/items", element: <Items/>},
])

export default function App() {
  return (
    <>
      <MainNav />
      <div className='content'>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </div>
      <Footer />
    </>
  )
}