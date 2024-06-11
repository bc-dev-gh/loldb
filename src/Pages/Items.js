import React from 'react';
import ItemDB from '../datadragon/item.json'

const itemSpriteBaseUrl = 'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/';

export default function Items() {
  return (
    <>
      <h1>Items: {ItemDB.version}</h1>
      <div className='container'>
        {
          Object.keys(ItemDB.data).map((key) => (
            <ItemCard item={ItemDB.data[key]}/>
          ))
        }
      </div>
    </>
  )
} 

function ItemCard(props) {
  if(props.item.gold.purchasable){
    //let statsMatch = props.item.description.match(new RegExp('<stats>.*<\/stats>'));
    //let statsText = statsMatch ? statsMatch[0] : "<stats>NO STATS</stats>";
    return ( 
      <div className='card'>
        <div className='card-header'>
            <img className='card-icon' src={itemSpriteBaseUrl+props.item.image.full} alt={props.item.name} />
            <span className='title'>{props.item.name}</span>
            <br/>
            {props.item.gold.total} G
        </div>
        <div className='card-description' dangerouslySetInnerHTML={{__html: props.item.description}}/>
      </div>
    )
  }
}