import React from 'react';
import ItemDB from '../datadragon/item.json'

const itemSpriteBaseUrl = 'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/';
const itemData = ItemDB.data

export default function Items() {
  let allTags = {}
  for (let itemId in ItemDB.data){
    for (let tag of ItemDB.data[itemId].tags) {
      if (!allTags.hasOwnProperty(tag))
        allTags[tag] = false
    }
  }
  
  const [filterList, setFilterList] = React.useState(allTags)
  
  function handleFilterCBChanged(event) {
    setFilterList(prevFilterList => ({...prevFilterList, [event.target.id]: event.target.checked}))
  }

  let noFiltersSelected = Object.keys(filterList).every(filter => !filterList[filter])

  let jsx_filterCheckboxes = Object.keys(filterList).map( filter =>
    <label className='filterlabel'> 
      {filter}
      <input className='filtercb' 
        type='checkbox' 
        checked={filterList[filter]} 
        id={filter} 
        onClick={handleFilterCBChanged}/>
    </label>)

  let jsx_itemCards = Object.keys(itemData).map(itemId => {
    let currentItem = itemData[itemId]
    //only render if the item is purchasable on Summoner's Rift (map 11)
    if (currentItem.gold.purchasable && currentItem.maps['11']) {
      let selectedFilters = Object.keys(filterList).filter(filter => filterList[filter])
      let matchedTags = 0
      if (!noFiltersSelected){
        for (let tag of currentItem.tags) {
          if (filterList[tag]){
            matchedTags++
          }
        }
      }
      return (noFiltersSelected || matchedTags === selectedFilters.length) && <ItemCard item={itemData[itemId]}/>
    }
  })

  return (
    <>
      <h1>Items: {ItemDB.version}</h1>
      <div className='filters' >
        {jsx_filterCheckboxes}
      </div>
      <div className='container'>
        {jsx_itemCards}
      </div>
    </>
  )
} 

function ItemCard(props) {
  //only render if the item is purchasable on summoners rift
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