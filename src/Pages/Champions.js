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
        <h3>Champion Name Search <input className='search' type='text' onInput={handleSearchInput}></input></h3> 
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
    let tagList = Object.keys(tagDict)
    return <FilterCategory title='Tags' horizontal={true} filters={tagList} filterHandler={filterHandler}/>
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
        let jsx_cardheader = <>
          <h4 className='card-title'>{currentChamp.name}</h4>
          {currentChamp.tags.map((tag) => (<p key={tag} className='card-subtitle'>{tag}</p>)) }
        </>
        let jsx_dangerouslyset_cardbody = {__html: currentChamp.blurb}
        return <Card key={key} iconurl={champSpriteBaseUrl+currentChamp.image.full} iconalt={currentChamp.name} header={jsx_cardheader} body={jsx_dangerouslyset_cardbody}/>
      }
      return (null)
    })
  }
} 
