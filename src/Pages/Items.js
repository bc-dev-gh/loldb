import React from 'react';
import FilterCategory from '../components/FilterCategory'
import Card from '../components/Card'
import ItemDB from '../datadragon/item.json'
import ItemFilters from '../datadragon/myItemFilters.json'

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

  const [searchString, setSearchString] = React.useState("")
  function handleSearchInput(event) { setSearchString(event.target.value) }

  const [filterList, setFilterList] = React.useState(allTags)
  function handleFilterCBChanged(event) { setFilterList(prevFilterList => ({...prevFilterList, [event.target.id]: event.target.checked})) }

  let jsx_filterCheckboxes = manageFilters(filterList, handleFilterCBChanged)
  let jsx_itemCards = manageCards(filterList, searchString)

  return (
    <>
      <h1>Items: {ItemDB.version}</h1>
      <label className='searchlabel'>
        <h3>Item Name Search <input className='search' type='text' onInput={handleSearchInput}></input></h3> 
      </label>
      <div className='filters' >
        {jsx_filterCheckboxes}
      </div>
      <div className='container'>
        {jsx_itemCards}
      </div>
    </>
  )
} 

function manageFilters (tagDict, cbHandler) {
  return Object.entries(ItemFilters).map( ([category, filters]) => {
    let filtergroup ={}
    for (let filter in filters) {
      filtergroup[filter] = tagDict[filter]
    }
    return <FilterCategory key={category} title={category} filters={filtergroup} filterHandler={cbHandler}/>
  })
}

function manageCards(filters, searchString) {
  let noFiltersSelected = Object.keys(filters).every(filter => !filters[filter])
  let selectedFilters = Object.keys(filters).filter(filter => filters[filter])
  return Object.keys(itemData).map(itemId => {
    let currentItem = itemData[itemId]
    //only render if the item is purchasable on Summoner's Rift (map 11)
    if (currentItem.gold.purchasable && currentItem.maps['11']) {
      let matchedTags = 0
      if (!noFiltersSelected){
        for (let tag of currentItem.tags) {
          if (filters[tag]){
            matchedTags++
          }
        }
      }

      //conditional rendering: search string must either be empty, be a substring of the item name,
      //or equal one of the item colloquial names
      //the item must also match all the selected tags if any are selected
      if ((searchString === '' || currentItem.name.toLowerCase().includes(searchString.toLowerCase()) || 
      currentItem.colloq.toLowerCase().split(';').includes(searchString.toLowerCase())) && 
      (noFiltersSelected || matchedTags === selectedFilters.length)) {
        let jsx_cardheader = <>
          <h4 className='card-title'>{currentItem.name}</h4>
          <p className='card-subtitle'>{currentItem.gold.total} G</p>
        </>
        let jsx_dangerouslyset_cardbody = {__html: currentItem.description}
        return <Card key={itemId} iconurl={itemSpriteBaseUrl+currentItem.image.full} iconalt={currentItem.name} header={jsx_cardheader} body={jsx_dangerouslyset_cardbody}/>
      }
    }
    return false
  })
}