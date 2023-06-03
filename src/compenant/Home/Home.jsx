import React, { useState, useEffect } from 'react';
import axios from 'axios';

import x from "../../images/images (1).png"
import { Link } from 'react-router-dom';

export default function Home() {

  let [moviesList, setMovieList] = useState([]);
  let [tvList, setTvList] = useState([]);
  let [peopleList, setPeopleList] = useState([]);

  useEffect(() => {
    getDate("movie", setMovieList)
    getDate("tv", setTvList)
    getDate("person", setPeopleList)

  }, [])

  async function getDate(type, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${type}/week?api_key=560fb44449769b5f314c4e202847d379`)
    callback(data.results);

  }


  



  return <>
  
  {/* <img src={require("../../images/images (1).png")} alt="" />
  <img src="../../img/download.jpg" alt="" /> */}
    <div className="row gy-3 align-items-center">
      <div className="col-md-4">
        <div className="yusuf w-25"></div>
        <h2 className=' my-3'>trending <br />movies <br /> to watch <br /> now</h2>
        <div className="yusuf "></div>

      </div>
      {moviesList.map((movie, i) => <div key={i} className="col-md-2">
        <Link to={"/moviedetails/"+movie.id}>
        <div className="items">
          <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt="" className='w-100' />
          <h3 className='pt-1 h6'>{movie.title}</h3>
        </div>
        </Link>
      </div>)}
    </div>


    <div className="row gy-3 align-items-center">
      <div className="col-md-4">
        <div className="yusuf w-25"></div>
        <h2 className=' my-3'>trending <br />tv <br /> to watch <br /> now</h2>
        <div className="yusuf "></div>

      </div>
      {tvList.map((tv, i) => <div key={i} className="col-md-2">
        <div className="items">
          <img src={'https://image.tmdb.org/t/p/w500/' + tv.poster_path} alt="" className='w-100' />
          <h3 className='pt-1 h6'>{tv.name}</h3>
        </div>
      </div>)}
    </div>



    <div className="row gy-3 align-items-center">
      <div className="col-md-4">
        <div className="yusuf w-25"></div>
        <h2 className=' my-3'>trending <br />movies <br /> to watch <br /> now</h2>
        <div className="yusuf "></div>

      </div>
      {peopleList.map((person, i) => <div key={i} className="col-md-2">
        <div className="items">
          {person.profile_path !=null?<img src={'https://image.tmdb.org/t/p/w500/' + person.profile_path} alt="" className='w-100' />:<img className='w-100' src={x} alt="" />}
          <h3 className='pt-1 h6'>{person.name}</h3>
        </div>
      </div>)}
    </div>
  </>


}
