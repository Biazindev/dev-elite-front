import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import Tag from "../Tag"
import { Movie } from '../../types'
import { useGetMovieTopRatedQuery } from '../services/api'
import Loader from '../Loader'

import * as S from "./styles"

const genreMap: Record<number, string> = {
    28: 'Ação',
    12: 'Aventura',
    16: 'Animação',
    35: 'Comédia',
    80: 'Crime',
    99: 'Documentário',
    18: 'Drama',
    10751: 'Família',
    14: 'Fantasia',
    36: 'História',
    27: 'Terror',
    10402: 'Música',
    9648: 'Mistério',
    10749: 'Romance',
    878: 'Ficção Científica',
    10770: 'Telefilme',
    53: 'Suspense',
    10752: 'Guerra',
    37: 'Faroeste'
}

const TopRated = () => {
    const [allMovies, setAllMovies] = useState<Movie[]>([])
    const [isHoveredForward, setIsHoveredForward] = useState(false)
    const [isHoveredBackward, setIsHoveredBackward] = useState(false)
    const { data: movies = [], error, isLoading } = useGetMovieTopRatedQuery()
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const navigate = useNavigate()

    const formatReleaseDate = (date: string) => {
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
    }

    const getGenres = (genreIds: number[] | undefined) => {
        if (!genreIds) {
            return 'Gêneros não disponíveis'
        }
        return genreIds.map(id => genreMap[id] || 'Desconhecido').join(', ')
    }

    useEffect(() => {
        if (movies.length) {
            const moviesWithId = movies.map((movie, index) => ({
                ...movie,
                id: movie.id || index + 1,
                isFavorite: movie.isFavorite ?? false,
                tmdbId: String(movie.tmdbId),
                movie: movie.video ? 'true' : 'false',
            }))
            setAllMovies(moviesWithId)
            console.log('Filmes carregados:', moviesWithId)
        }
    }, [movies])

    useEffect(() => {
        if (isHoveredForward || isHoveredBackward) {
            intervalRef.current = setInterval(() => {
            }, 1000)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [isHoveredForward, isHoveredBackward])


    const getDescription = (descricao: string) => {
        return descricao.length > 37 ? descricao.slice(0, 34) + '...' : descricao
    }

    const formatRating = (rating: number) => parseFloat(rating.toFixed(1))

    const placeholderImage = "https://via.placeholder.com/250x350"

    if (isLoading) return <div><Loader /></div>
    if (error) return <div>Erro ao carregar os filmes</div>

    return (
        <>
            <S.TitleSection>Melhores Avaliados</S.TitleSection>
            <S.Container>
                {allMovies.map((movie: Movie) => (
                    <S.Card key={movie.id} onClick={() => {
                        navigate(`/movies/details/${movie.tmdbId}`)
                    }} >
                        <span>
                            <Tag value={formatRating(movie.rating)} size={"big"} />
                        </span>
                        <img
                            src={movie.thumbnail || placeholderImage}
                            alt={movie.title}
                            onError={(e) => (e.currentTarget.src = placeholderImage)}
                        />
                        <h3>{getDescription(movie.title)}</h3>
                        <div>
                            <p>Lançamento:<br /> {formatReleaseDate(movie.releaseDate)}</p>
                            <p>Popularidade:<br /> {movie.popularity}</p>
                            <p>Gêneros: {movie.genreIds ? getGenres(movie.genreIds) : 'Gêneros não disponíveis'}</p>
                        </div>
                        <button>Saiba mais</button>
                    </S.Card>
                ))}
            </S.Container>
        </>
    )
}

export default TopRated
