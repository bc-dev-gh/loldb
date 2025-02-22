import React from 'react';
import FilterCategory from '../components/FilterCategory'
import Card from '../components/Card'
import ItemFilters from '../datadragon/myItemFilters.json'
import Globals from '../globals';

export default function Items() {
  const [itemDB, setItemDB] = React.useState({})
  const [filterList, setFilterList] = React.useState({})
  const [searchString, setSearchString] = React.useState("")

  React.useEffect(() => {
    const endpoint= Globals.ddDataUrl('item')
    fetch(endpoint).then((res) => {
      return res.json();
    }).then((data) => {
      setItemDB(data)
      for (let itemId in data.data){
        for (let tag of data.data[itemId].tags) {
          if (!filterList.hasOwnProperty(tag)) {
            setFilterList(prevFilterList => ({...prevFilterList, [tag]: false}))
          }
        }
      }
    })
  },[filterList])

  function handleSearchInput(event) { setSearchString(event.target.value) }
  function handleFilterCBChanged(event) { setFilterList(prevFilterList => ({...prevFilterList, [event.target.id]: event.target.checked})) }

  let jsx_filterCheckboxes = manageFilters(filterList, handleFilterCBChanged)
  let jsx_itemCards = manageCards(filterList, searchString)

  return (
    <>
      <h1>Items: {itemDB.version}</h1>
      <label className='searchlabel'>
        <h3>Item Name Search <input className='search' type='text' onChange={handleSearchInput} value={searchString}></input></h3> 
      </label>
      <div className='filters' >
        {jsx_filterCheckboxes}
      </div>
      <div className='container'>
        {jsx_itemCards}
      </div>
    </>
  )

  function manageFilters (tagDict, cbHandler) {
    return Object.entries(ItemFilters).map( ([category, filters]) => {
      let filtergroup = {}
      for (let filter in filters) {
        filtergroup[filter] = tagDict[filter]
      }
      return <FilterCategory key={category} title={category} filters={filtergroup} filterHandler={cbHandler}/>
    })
  }
  
  function manageCards(filters, searchString) {
    let noFiltersSelected = Object.keys(filters).every(filter => !filters[filter])
    let selectedFilters = Object.keys(filters).filter(filter => filters[filter])
    try {
      return Object.keys(itemDB.data).map(itemId => {
        let currentItem = itemDB.data[itemId]
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
            return <Card key={itemId}
            title={currentItem.name}
            subtitle={currentItem.gold.total+" G"}
            linkurl={`/loldb/items/${itemId}`}
            iconurl={Globals.ddImgUrl('item',currentItem.image.full)}
            iconalt={currentItem.name}
            body={currentItem.description}
            hoverable='true'/>
          }
        }
        return false
      })
    }
    catch (error) {
      return <></>
    }
  }
} 

