import React from 'react'
import './Footer.css';


export default function Footer() {
  return (
    <>
      <div className='footer-spacer'></div>
      <footer>
        <ul className='footer-list'>
          <li>React Version: {React.version}</li>
        </ul>
      </footer>
    </>
  )
}
