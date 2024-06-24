import React from 'react'
import './Card.css';


export default function Card(props) {
  //only render if the item is purchasable on summoners rift
  return ( 
    <div className='card'>
      <div className='card-header'>
          <img className='card-icon' src={props.iconurl} alt={props.iconalt} />
          {props.header}
      </div>
      <div className='card-description' dangerouslySetInnerHTML={props.body}/>
    </div>
  )
}