import React, {useState} from 'react';
import './App.css';
import Paragraph from "./paragraph/Paragraph.jsx";

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
            setSearch('')
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
                            <Paragraph text={'IMDb rating'} data={film.imdbRating} />
                            <Paragraph text={'Votes'} data={film.imdbVotes} />
                        </div>
                    </div>
                    <div className={'film-right'}>
                        <Paragraph text={'Year'} data={film.Year}/>
                        <Paragraph text={'Released'} data={film.Released}/>
                        <Paragraph text={'Country'} data={film.Country}/>
                        <Paragraph text={'Genre'} data={film.Genre}/>
                        <Paragraph text={'Writer'} data={film.Writer}/>
                        <div className={'plot-container'}>
                            <Paragraph data={film.Plot} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
