import React from "react"
import Globals from "../globals.js"
import Card from "../components/Card.jsx"
import { useParams } from "react-router-dom"

export default function ChampionDetail() {
  const {champId} = useParams()
  const [champData, setChampData] = React.useState({})
  const [lolVersion, setLolVersion] = React.useState(0)

  React.useEffect(() => {
    const endpoint = Globals.ddDataUrl('champion',champId)
    fetch(endpoint).then((res) => {
      return res.json()
    }).then((data) => {
      setChampData(data.data[champId])
      setLolVersion(data.version)
    })
  }, [champId])

  try{
    return(
      <>
        <h1>{champData.name}: {lolVersion}</h1>
        <label className='searchlabel'>
          <h3>About</h3> 
        </label>
        <div className='container'>
          {manageAbout()}
        </div>
        <label className='searchlabel'>
          <h3>Skills</h3> 
        </label>
        <div className='container'>
          {manageSkills()}
        </div>
        <label className='searchlabel'>
          <h3>Skins</h3> 
        </label>
        <div className='container'>
          {manageSkins()}
        </div>
      </>
    )
  }
  catch (error){
    /*
    when trying to use dictionary key notation to fetch attributes from the json object from the API pull, we error out.
    This empty catch allows ignoring this error and wait for the champDB to be updated and then rerender
    */
    return <></>
  }

  function manageAbout() {
    return (
      <>
        <Card 
        title={champData.name}
        subtitle={champData.title}
        iconurl={Globals.ddImgUrl('champion', champData.image.full)}
        iconalt={champData.name}
        body={champData.lore}/>
        <Card 
        title={`Playing with ${champData.name}`}
        iconurl={Globals.ddImgUrl('champion', champData.image.full)}
        iconalt={champData.name}
        body={champData.allytips}/>
        <Card 
        title={`Playing against ${champData.name}`}
        iconurl={Globals.ddImgUrl('champion', champData.image.full)}
        iconalt={champData.name}
        body={champData.enemytips}/>
      </>
    )
  }

  function manageSkills() {
    return (     
      <>
        <Card key={champData.passive.name}
          title={champData.passive.name}
          iconurl={Globals.ddImgUrl('passive', champData.passive.image.full)}
          iconalt={champData.passive.image.full}
          body={champData.passive.description}
          hoverable='true'/>
        {champData.spells.map((skill) => {
          return <Card key={skill.id}
          title={skill.name}
          iconurl={Globals.ddImgUrl('spell', skill.image.full)}
          iconalt={skill.id}
          body={skill.description}
          hoverable='true'/>
          }
        )}
      </>
    )
  }

  function manageSkins() {
    return champData.skins.map((skin) => {
      const skinImgSrc = Globals.ddImgUrl('champion/loading',`${champData.id}_${skin.num}.jpg`)
      return <Card key={skin.id}
      title={skin.name === 'default' ? champData.name : skin.name}
      iconurl={Globals.ddImgUrl('champion', champData.image.full)}
      iconalt={champData.name}
      body={`<img src=${skinImgSrc} alt=${skin.name} />`}
      alt={`${champData.id}_${skin.num}`}
      hoverable='true'/>
    })
  }
}

