import React from 'react';
import ItemDB from '../datadragon/item.json'

const itemSpriteBaseUrl = 'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/';

export default function Items() {
  //dynamically build list of stats
  let allTags = {}
  for (let itemId in ItemDB.data){
    for (let i in ItemDB.data[itemId].tags) {
      let tag = ItemDB.data[itemId].tags[i]
      if (!allTags.hasOwnProperty(tag))
        allTags[tag] = {checked: false}
    }
  }

  const ALL_ITEM_IDS = Object.keys(ItemDB.data)
  const [filterList, setFilterList] = React.useState(allTags)
  const [itemsList, setItemsList] = React.useState(ALL_ITEM_IDS)

  
  function checkFilter(event) {
    const newFilterList = {...filterList,
      [event.target.id]:{...filterList[event.target.id], checked: event.target.checked}
    }
    setFilterList(newFilterList)

    //check all filters the old fashioned way. Is there a shorthand for this?
    let selectedFilters = []
    for (let filterName in newFilterList) {
      if (newFilterList[filterName].checked){
        selectedFilters.push(filterName)
      }
    }
    //if no filters selected, show all items
    if (0 === selectedFilters.length){
      setItemsList(ALL_ITEM_IDS)
    }
    //otherwise show filtered items (must match all filters)
    else{
      let newItemsList =  []
      for (let itemId in ItemDB.data){
        let tagMatches = 0
        for (let i in ItemDB.data[itemId].tags) {
          let tag = ItemDB.data[itemId].tags[i]
          if (selectedFilters.includes(tag)) {
            tagMatches++
            if(tagMatches >= selectedFilters.length)
            {
              newItemsList.push(itemId)
              break
            }
          }
        }
      }
      setItemsList(newItemsList)
    }
  }

  return (
    <>
      <h1>Items: {ItemDB.version}</h1>
      <div className='filters' >
        {Object.keys(filterList).map( key => (key[0] !=='r') && 
          <label className='filterlabel'> 
            {key}
            <input className='filtercb' 
              type='checkbox' 
              checked={filterList[key].checked} 
              id={key} 
              onClick={checkFilter}/>
          </label>)}
      </div>
      <div className='container'>
        { itemsList.map(key => <ItemCard item={ItemDB.data[key]}/>) }
      </div>
    </>
  )
} 

function ItemCard(props) {
  //only render if the item is purchasable on summoners rift
  if(props.item.gold.purchasable && props.item.maps['11']){
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