import './MainNav.css';

export default function MainNav() {
  return (
    <nav className='main-nav'>
    <img className='nav-logo' alt='nav logo' src='https://brand.riotgames.com/static/a91000434ed683358004b85c95d43ce0/8a20a/lol-logo.png'/>
      <ul className='nav-list'>
        <li><a href='/#'>Home</a></li>
        <li><a href='/#champions'>Champions</a></li>
        <li><a href='/#items'>Items</a></li>
        <li><a href='/#summoner_spells'>Summoner Spells</a></li>
        <li className='push-right'>About</li>
        <li>Stuff</li>
      </ul>
    </nav>
  )
}