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
        <Card 
        title={champData.name}
        subtitle={champData.title}
        iconurl={Globals.ddImgUrl('champion', champData.image.full)}
        iconalt={champData.name}
        body={champData.lore}/>
        <label className='searchlabel'>
          <h3>Skills</h3> 
        </label>
        <div className='container'>
          {manageSkills()}
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
        })}
      </>
    )
  }
}

