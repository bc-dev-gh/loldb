import React from 'react';
import ChampDB from '../datadragon/champion.json'

const champSpriteBaseUrl = 'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/';

export default function Champions() {
  return (
    <>
      <h1>Champions: {ChampDB.version}</h1>
      <div className='container'>
        {
          Object.keys(ChampDB.data).map((key) => (
            <ChampCard champ={ChampDB.data[key]}/>
          ))
        }
      </div>
    </>
  )
} 

function ChampCard(props) {
    return ( 
      <div className='card'>
        <div className='card-header'>
            <img className='card-icon' src={champSpriteBaseUrl+props.champ.image.full} alt={props.champ.id} />
            <span className='title'>{props.champ.name}</span>
            {props.champ.tags.map((tag) => (<span><br/>{tag}</span>)) }
        </div>
        <div className='card-description' dangerouslySetInnerHTML={{__html: props.champ.blurb}}/>
      </div>
    )
}