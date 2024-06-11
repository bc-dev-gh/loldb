import './MainStyle.css';
import {HashRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home.js';
import Champions from './Pages/Champions.js';
import Items from './Pages/Items.js';
import SummonerSpells from './Pages/SummonerSpells.js';
import MainNav from './components/MainNav.js'
import Footer from './components/Footer.js'

export default function App() {
  return (
      <HashRouter>
        <MainNav />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/champions' element={<Champions/>}/>
            <Route path='/items' element={<Items/>}/>
            <Route path='/summoner_spells' element={<SummonerSpells/>}/>
          </Routes>
        </div>
        <Footer />
      </HashRouter>
  )
}