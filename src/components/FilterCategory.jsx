import React from 'react'
import './FilterCategory.css';


export default function FilterCategory(props) {
  let flexDirection = props.horizontal ? 'flex-row' : 'flex-column'
  let itemWidth = props.horizontal ? ' filter-fullwidth' : ''
  return <div className={`filter-category${itemWidth}`}>
    <h2>{props.title}</h2>
      <div className={flexDirection}>
      {
        Object.entries(props.filters).map( ([filter, isChecked]) => { 
          let currentState = isChecked
          return <label className={currentState? 'filterlabel-selected' : 'filterlabel'} key={filter}> 
            {filter}
            <input className='filtercb' 
              type='checkbox' 
              checked={isChecked} 
              id={filter}
              name={filter}
              onChange={props.filterHandler}/>
          </label>
        })
      }
      </div>
  </div>
}