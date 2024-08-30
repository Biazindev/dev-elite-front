import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from './styles'
import { PiMagnifyingGlassThin } from 'react-icons/pi'
import { Movie } from '../../types'
import api from '../services/api'

const Header: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('')
    const navigate = useNavigate()

    const { data: searchResults, isFetching, error } = api.useSearchMoviesQuery(debouncedSearchTerm, {
        skip: debouncedSearchTerm.trim() === '',
    })

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 300)
        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm])

    useEffect(() => {
        if (selectedMovie) {
            navigate(`/movies/details/${selectedMovie.tmdbId}`)
            setSearchTerm('')
            setSelectedMovie(null)
        }
    }, [selectedMovie, navigate])

    return (
        <Container>
            <PiMagnifyingGlassThin />
            <input
                placeholder="Busque por filmes, séries, tv e mais..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && !isFetching && searchResults && searchResults.length > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        height: 'auto',
                        width: '400px',
                        backgroundColor: 'transparent',
                        color: '#fff',
                        zIndex: 1000,
                        top: '60px',
                    }}
                >
                    {searchResults.map((movie) => (
                        <div
                            key={movie.tmdbId}
                            onClick={() => setSelectedMovie(movie)}
                            style={{
                                padding: '8px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #ccc',
                            }}
                        >
                            {movie.title}
                        </div>
                    ))}
                </div>
            )}
            {isFetching && <div className="loading-indicator">Carregando...</div>}
            {error && <div>Erro ao buscar filmes</div>}
        </Container>
    )
}

export default Header
