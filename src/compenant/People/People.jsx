import React, { useState, useEffect } from 'react';
import axios from 'axios';
import x from "../../images/images (1).png"

export default function People() {

  let [peopleList, setPeopleList] = useState([]);
  useEffect(() => {
  
    getDate("person", setPeopleList)

  }, [])

  async function getDate(type, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${type}/week?api_key=560fb44449769b5f314c4e202847d379`)
    callback(data.results);

  }
  return (
    <>
    <div className="row gy-3 align-items-center">
      
      {peopleList.map((person, i) => <div key={i} className="col-md-2">
        <div className="items">
          {person.profile_path !=null?<img src={'https://image.tmdb.org/t/p/w500/' + person.profile_path} alt="" className='w-100' />:<img className='w-100' src={x} alt="" />}
          <h3 className='pt-1 h6'>{person.name}</h3>
        </div>
      </div>)}
    </div>
    </>
  )
}
