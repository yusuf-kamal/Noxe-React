import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Movie() {

  let [moviesList, setMovieList] = useState([]);
  let [category, setcategory] = useState('');

let pagesNumber= new Array(10).fill("").map((el,i)=>i+1)
console.log(pagesNumber);
  useEffect(() => {
    getDate()
  

  }, [])

    async function getDate(pageNum=1, type="popular") {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=560fb44449769b5f314c4e202847d379&language=en-US&page=${pageNum}`)
    setMovieList(data.results);

  }
function changNumber(page) {
  console.log(page);
  getDate(page,category)
}
function changType(e) {
  let type =e.target.id;
  console.log(type);
  getDate(1,type)
  setcategory(type)
}
async function search(e) {
  let value=e.target.value;
  if(value!=""){
  console.log(value);
  let {data}=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=560fb44449769b5f314c4e202847d379&language=en-US&query=${value}&page=1&include_adult=false`)

  setMovieList(data.results)
}else{
  getDate()
}
}

  return (

    <>
    <input type="text"className='form-control bg-transparent w-25 my-3 text-white' onChange={search} placeholder='Search'/>
     <div className="row gy-3 align-items-center">
      
<div className="col-md-2 pointer">
  <p id='popular' onClick={changType}>popular</p>
  <p id='top_rated'  onClick={changType}>toprated</p>
  <p id='upcoming' onClick={changType}>upcoming</p>
  <p id='now_playing' onClick={changType}>nowpalying</p>


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


    <nav aria-label="..." className='d-flex justify-content-center'>
  <ul className="pagination pagination-sm ">
    {pagesNumber.map((el,i)=> <li className="page-item"><a onClick={()=>changNumber(el)} className="page-link">{el}</a></li>)}
   


  </ul>
</nav>
    </>
    )
}
