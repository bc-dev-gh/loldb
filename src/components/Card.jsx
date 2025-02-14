import React from 'react'
import './Card.css';


export default function Card(props) {
  // Note: we pull some html  body from the LoL Datadragon data. Not great security but we trust Riot
  const body = {__html: props.body}
  return ( 
    <div className='card'>
      <h1 className='card-header'>
          <img className='card-icon' src={props.iconurl} alt={props.iconalt} />
          {props.header}
      </h1>
      <div className='card-description' dangerouslySetInnerHTML={props.body}/>
    </div>
  )
}