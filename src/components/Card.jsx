import React from 'react'
import './Card.css';
import { Outlet, Link } from 'react-router-dom';


export default function Card(props) {
  // Note: we pull some html  body from the LoL Datadragon data. Not great security but we trust Riot
  const body = {__html: props.body}
  let content =
    <>
      <div className='card-header'>
        {props.iconurl && <img className='card-icon' src={props.iconurl} alt={props.iconalt} />}
        <h4>{props.title}</h4>
        <h5>{props.subtitle}</h5>
      </div>
      <p className='card-description' dangerouslySetInnerHTML={body}/>
    </>
  return ( 
    <>
      <div className={props.hoverable ? 'card card-hoverable' : 'card'}>
        {props.linkurl ? <Link to={props.linkurl}>{content}</Link> : content}
      </div>
      <Outlet />
    </>
  )
}