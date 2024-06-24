import React from 'react'
import './FilterCategory.css';

export default function FilterCategory(props) {
  return <div className="filter-category">
    <h2>{props.title}</h2>
    {
      props.filters.map( filter =>
        <label className='filterlabel'> 
          {filter}
          <input className='filtercb' 
            type='checkbox' 
            checked={props.filters[filter]} 
            id={filter} 
            onClick={props.filterHandler}/>
        </label>)
    }
  </div>
}