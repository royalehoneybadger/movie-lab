import React from 'react';
import { useState,useEffect } from 'react';
import  './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API = 'https://www.omdbapi.com?apikey=f8732524';


const App = () => {

    const [movies,setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovie = async (title) => {
        const response = await fetch(`${API}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)
    }

    useEffect(() => {
        searchMovie('Balto');

    }, []);

    return (
        <div className='app'>
            <h1>MovieLab</h1>
            <div className='search'>
                <input 
                placeholder='search for movies' 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <img 
                src={SearchIcon} 
                alt='search' 
                onClick={() => searchMovie(searchTerm) }
                />
            </div>

            {movies?.length > 0
                ?(
                    <div className='container'>
                        {movies.map((movie) =>(
                                <MovieCard movie = {movie}/>
                       ) )}
                    </div>
                ) :
                (
                    <div className='empty'>
                            <h2>No movies found</h2>
                    </div>
                )}
            
        </div>
    );
}

export default App;