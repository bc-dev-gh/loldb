import './MainNav.css';
import { Outlet, Link } from 'react-router-dom';

export default function MainNav() {
  return (
    <>
      <nav className='main-nav'>
      <img className='nav-logo' alt='nav logo' src='https://brand.riotgames.com/static/a91000434ed683358004b85c95d43ce0/8a20a/lol-logo.png'/>
        <ul className='nav-list'>
          <li><Link to='/loldb/'>Home</Link></li>
          <li><Link to='/loldb/champions'>Champions</Link></li>
          <li><Link to='/loldb/items'>Items</Link></li>
          <li className='push-right'>About</li>
          <li>Stuff</li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}