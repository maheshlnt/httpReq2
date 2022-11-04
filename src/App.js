import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [error, setError]=useState(null)

  // function fetchMoviesHandler(){ 
  //   fetch('https://swapi.py4e.com/api/films').then(response=>{
  //     return response.json();
  //   }).then(data=>{
  //     const transformedMovies=data.results.map(movieData=>{
  //       return {
  //             id: movieData.episode_id,
  //             title: movieData.title,
  //             openingText: movieData.opening_crawl,
  //             releaseDate: movieData.release_date,
  //       }
  //     })
  //     setMovies(transformedMovies)
  //   })
  // }
 async function fetchMoviesHandler(){ 
  setIsLoading(true);
  setError(null)
  try{
  const response= await fetch('https://swapi.py4e.com/api/film')
  
   const data  = await response.json();  //to show exact syntax error 
  if(!response.ok){
    throw new Error('Something went wrong')  //to show defined error message
  }
  //const data  = await response.json(); 
    const transformedMovies=data.results.map(movieData=>{
      return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
      }
    })
    setMovies(transformedMovies)
    // setIsLoading(false); moved to bottom
  }catch (error){
   setError(error.message);
  } 
  setIsLoading(false);}
 
return (
  <React.Fragment>
    <section>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
    </section>
    <section>
      {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
      {!isLoading && movies.length===0 && !error && <p>No movies found</p>}
      {!isLoading && error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
    </section>
  </React.Fragment>
);
}

export default App;
