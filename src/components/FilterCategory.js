import React from 'react'
import './FilterCategory.css';


export default function FilterCategory(props) {
  let flexDirection = props.horizontal ? 'flex-row' : 'flex-column'
  let itemWidth = props.horizontal ? ' filter-fullwidth' : ''
  return <div className={`filter-category${itemWidth}`}>
    <h2>{props.title}</h2>
      <div className={flexDirection}>
      {
        props.filters.map( filter =>
          <label className='filterlabel' key={filter}> 
            {filter}
            <input className='filtercb' 
              type='checkbox' 
              checked={props.filters[filter]} 
              id={filter} 
              onClick={props.filterHandler}/>
          </label>)
      }
      </div>
  </div>
}