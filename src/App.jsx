import React, {useState} from 'react';
import './App.css';

function App() {
    const API_KEY = '74d15b84'
    const [film, setFilm] = useState('')
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    async function fetchFilm() {
        setLoading(true)
        try {
            const response_data = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${search}`)
            const data = await response_data.json()

            if (data.Response === "False") {
                throw new Error(data.Error);
            }

            setFilm(data)
        }
        catch (error) {
            alert('Error occurred! ' + error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="app-container">
            <div className={'input-container'}>
                <input type={'text'} onChange={(e) => setSearch(e.target.value)} value={search} />
                <button onClick={fetchFilm}>Search</button>
            </div>

            {loading && (
                <div className={'loading-container'}>
                    <h1>Loading...</h1>
                </div>
            )}

            {film && (
                <div className={'film-container'}>
                    <div className={'film-left'}>
                        <h1>{film.Title}</h1>
                        <img src={film.Poster} alt={film.Title} />
                        <div className={'film-left-info-container'}>
                            <p className={'film-info'}>IMBd rating: {film.imdbRating}</p>
                            <p className={'film-info'}>Votes: {film.imdbVotes}</p>
                        </div>
                    </div>
                    <div className={'film-right'}>
                        <p className={'film-info'}><span>Year:</span> {film.Year}</p>
                        <p className={'film-info'}><span>Released:</span> {film.Released}</p>
                        <p className={'film-info'}><span>Country:</span> {film.Country}</p>
                        <p className={'film-info'}><span>Genre:</span> {film.Genre}</p>
                        <p className={'film-info'}><span>Writer:</span> {film.Writer}</p>
                        <div className={'plot-container'}>
                            <p className={'plot'}>{film.Plot}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
