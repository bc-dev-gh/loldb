import React from 'react';
import Card from '../components/Card'
import ChampDB from '../datadragon/champion.json'

const champSpriteBaseUrl = 'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/';

export default function Champions() {
  return (
    <>
      <h1>Champions: {ChampDB.version}</h1>
      <div className='container'>
        {
          Object.keys(ChampDB.data).map((key) => {
            let currentChamp = ChampDB.data[key]
            let jsx_cardheader = <>
              <h4 className='card-title'>{currentChamp.name}</h4>
              {currentChamp.tags.map((tag) => (<p className='card-subtitle'>{tag}</p>)) }
            </>
            let jsx_dangerouslyset_cardbody = {__html: currentChamp.blurb}
            return <Card iconurl={champSpriteBaseUrl+currentChamp.image.full} iconalt={currentChamp.name} header={jsx_cardheader} body={jsx_dangerouslyset_cardbody}/>
          })
        }
      </div>
    </>
  )
} 
