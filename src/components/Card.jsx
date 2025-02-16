import React from 'react'
import './Card.css';


export default function Card(props) {
  // Note: we pull some html  body from the LoL Datadragon data. Not great security but we trust Riot
  const body = {__html: props.body}
  return ( 
    <div className='card'>
      <div className='card-header'>
          {props.iconurl && <img className='card-icon' src={props.iconurl} alt={props.iconalt} />}
          <h4>{props.title}</h4>
          <h5>{props.subtitle}</h5>
      </div>
      <p className='card-description' dangerouslySetInnerHTML={body}/>
    </div>
  )
}