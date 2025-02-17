import React from 'react';
import FilterCategory from '../components/FilterCategory';
import Card from '../components/Card'
import ChampDB from '../datadragon/champion.json'

const champSpriteBaseUrl = 'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/';

export default function Champions() {
  let allTags = {}
  for (let champId in ChampDB.data) {
    for (let tag of ChampDB.data[champId].tags) {
      if (!allTags.hasOwnProperty(tag))
        allTags[tag] = false
    }
  }

  const [searchString, setSearchString] = React.useState("")
  function handleSearchInput(event) { setSearchString(event.target.value) }
  
  const [filterList, setFilterList] = React.useState(allTags)
  function handleFilterCBChanged(event) { setFilterList(prevFilterList => ({...prevFilterList, [event.target.id]: event.target.checked})) }

  let jsx_filterCheckboxes = manageFilters(filterList, handleFilterCBChanged)
  let jsx_champCards = manageCards(filterList, searchString)

  return (
    <>
      <h1>Champions: {ChampDB.version}</h1>
      <label className='searchlabel'>
        <h3>Champion Name Search <input className='search' type='text' onChange={handleSearchInput} value={searchString}></input></h3> 
      </label>
      <div className='filters' >
        {jsx_filterCheckboxes}
      </div>
      <div className='container'>
        { jsx_champCards}
      </div>
    </>
  )

  function manageFilters (tagDict, filterHandler) {
    return <FilterCategory title='Tags' horizontal={true} filters={tagDict} filterHandler={filterHandler}/>
  }

  function manageCards (filters, searchString) {
    let noFiltersSelected = Object.keys(filters).every(filter => !filters[filter])
    let selectedFilters = Object.keys(filters).filter(filter => filters[filter])
      
    return Object.keys(ChampDB.data).map((key) => {
      let currentChamp = ChampDB.data[key]
      let matchedTags = 0
      if (!noFiltersSelected){
        for (let tag of currentChamp.tags) {
          if (filters[tag]){
            matchedTags++
          }
        }
      }
      //conditional rendering: search string must be empty or match champion name
      if ((searchString === '' || currentChamp.name.toLowerCase().includes(searchString.toLowerCase())) && 
      (noFiltersSelected || matchedTags === selectedFilters.length)) {
        return <Card key={key}
        title={currentChamp.name}
        subtitle={currentChamp.tags.join("/")}
        linkurl='/loldb/items'
        iconurl={champSpriteBaseUrl+currentChamp.image.full}
        iconalt={currentChamp.name}
        body={currentChamp.blurb}/>
      }
      return (null)
    })
  }
} 
