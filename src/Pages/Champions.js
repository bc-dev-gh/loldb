import React from 'react';
import FilterCategory from '../components/FilterCategory';
import Card from '../components/Card'
import Globals from '../globals';

export default function Champions() {
  const [champDB, setChampDB] = React.useState({})
  const [filterList, setFilterList] = React.useState({})
  const [searchString, setSearchString] = React.useState("")

  React.useEffect(() => {
    const endpoint = Globals.ddDataUrl('champion')
    fetch(endpoint).then((res) => {
      return res.json();
    }).then((data) => {
      setChampDB(data)
      console.log('setting champdb')
      for (let champId in data.data) {
        for (let tag of data.data[champId].tags) {
          if (!filterList.hasOwnProperty(tag))
            setFilterList(prevFilterList => ({...prevFilterList, [tag]: false}))
        }
      }
    })
  }, [filterList])

  function handleSearchInput(event) { setSearchString(event.target.value) }
  function handleFilterCBChanged(event) { setFilterList(prevFilterList => ({...prevFilterList, [event.target.id]: event.target.checked})) }

  return (
    <>
      <h1>Champions: {champDB.version}</h1>
      <label className='searchlabel'>
        <h3>Champion Name Search <input className='search' type='text' onChange={handleSearchInput} value={searchString}></input></h3> 
      </label>
      <div className='filters' >
        {manageFilters(filterList, handleFilterCBChanged)}
      </div>
      <div className='container'>
        {manageCards(filterList, searchString)}
      </div>
    </>
  )

  function manageFilters (tagDict, filterHandler) {
    return <FilterCategory title='Tags' horizontal={true} filters={tagDict} filterHandler={filterHandler}/>
  }

  function manageCards (filters, searchString) {
    let noFiltersSelected = Object.keys(filters).every(filter => !filters[filter])
    let selectedFilters = Object.keys(filters).filter(filter => filters[filter])
    try {
      return Object.keys(champDB.data).map((key) => {
        let currentChamp = champDB.data[key]
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
          linkurl={`/loldb/champions/${currentChamp.id}`}
          iconurl={Globals.ddImgUrl('champion',currentChamp.image.full)}
          iconalt={currentChamp.name}
          body={currentChamp.blurb}
          hoverable='true'/>
        }
        return (null)
      })
    }
    catch (error){
      /*
      when trying to use dictionary key notation to fetch attributes from the json object from the API pull, we error out.
      This empty catch allows ignoring this error and wait for the champDB to be updated and then rerender
      */
      return <></>
    }
  }
} 
