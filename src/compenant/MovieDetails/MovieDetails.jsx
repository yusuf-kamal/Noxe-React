import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function MovieDetails() {
    let { id } = useParams()
    console.log(id);
    let [movie, setMovie] = useState(null)

    useEffect(() => {
        getMovieDetails(id)
    }

        , [])

    async function getMovieDetails(movieId) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=560fb44449769b5f314c4e202847d379&language=en-US`)
        // console.log(data);
        setMovie(data)
    }
    return (
        <>
            {movie !== null ? <div className="row">
                <div className="col-md-4">
                    <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt="" className='w-100' />
                </div>
                <div className="col-md-8 gy-1 ">
                    <h2>{movie.title}</h2>
                    {movie.genres.map((el) => <span className='btn btn-info btn-sm mx-1 my-3'>{el.name}</span>)}
                    <p>vote : {movie.vote_average}</p>
                    <p>vote count : {movie.vote_count}</p>
                    <p>release date : {movie.release_date}</p>
                    <p>popularity : {movie.popularity}</p>
                    <p className=' text-muted'>{movie.overview}</p>

                </div>
            </div> : ""}

        </>
    )
}
