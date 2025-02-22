import React from 'react'
import Globals from '../globals.js'
import Card from '../components/Card.jsx'
import { useParams } from 'react-router-dom'

export default function ItemDetail() {
  const {itemId} = useParams()
  const [thisItem, setThisItem] = React.useState({})
  const [itemDB, setItemDB] = React.useState({})
  const [lolVersion, setLolVersion] = React.useState(0)

  React.useEffect(() => {
    console.log('useEffect Triggered')
    const endpoint = Globals.ddDataUrl('item')
    fetch (endpoint).then((res) => {
      return res.json()
    }).then((data) => {
      setItemDB(data)
      setLolVersion(data.version)
      setThisItem(data.data[itemId])
    })
  }, [itemId])

  return(
    <>
      <h1>{thisItem.name}: {lolVersion}</h1>
      {manageDetails()}
      <label className ='searchlabel'>
        <h3>Builds From</h3>
      </label>
      <div className='container'>
        {manageBuildsFrom()}
      </div>
      <label className ='searchlabel'>
        <h3>Builds Into</h3>
      </label>
      <div className='container'>
        {manageBuildsInto()}
      </div>
    </>
  )

  function manageDetails(){
    try{
      return <Card
      title={thisItem.name}
      subtitle={`${thisItem.gold.total ? thisItem.gold.total: '???'} G / Sell: ${thisItem.gold.sell ? thisItem.gold.sell : '???'} G`}
      iconurl={Globals.ddImgUrl('item',thisItem.image.full ? thisItem.image.full : '')}
      iconalt={thisItem.name}
      body={thisItem.description} />
    }
    catch (error){
      return <>{error.message}</>
    }
  }

  function manageBuildsFrom() {
    try{
      return(
        <>
          {
            Object.keys(itemDB.data).map(currentItemId => {
              const currentItem = itemDB.data[currentItemId]
              return itemDB.data[currentItemId].into &&
                itemDB.data[currentItemId].into.includes(itemId) && 
                <Card key={`from_${currentItemId}`}  
                title={currentItem.name}
                subtitle={currentItem.gold.total+" G"}
                linkurl={`/loldb/items/${currentItemId}`}
                iconurl={Globals.ddImgUrl('item',currentItem.image.full)}
                iconalt={currentItem.name}
                body={currentItem.description}
                hoverable='true'/>
            })
          }
        </>
      )
    }
    catch (error){
      return <>{error.message}</>
    }
  }

  function manageBuildsInto() {
    try{
      return(
        <>
        {thisItem.into.map((currentItemId) => {
          const currentItem = itemDB.data[currentItemId]
          return  currentItem.maps['11'] && <Card key={`into_${currentItemId}`}
            title={currentItem.name}
            subtitle={currentItem.gold.total+" G"}
            linkurl={`/loldb/items/${currentItemId}`}
            iconurl={Globals.ddImgUrl('item',currentItem.image.full)}
            iconalt={currentItem.name}
            body={currentItem.description}
            hoverable='true'/>
          }
        )}
        </>
      )
    }
    catch (error){
      return <>{error.message}</>
    }
  } 
}