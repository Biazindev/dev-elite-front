import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import api, { useGetMovieTopRatedQuery } from '../../services/api'
import { Movie } from '../../../types'
import Tag from '../../Tag'
import Loader from '../../Loader'
import Header from '../../Header'

import * as S from './styles'

const Results: React.FC = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('query') || ''
    const navigate = useNavigate()

    const { data: movies = [], isLoading: isLoadingTopRated } = useGetMovieTopRatedQuery()

    const { data: searchResults = [], isFetching, error } = api.useSearchMoviesQuery(query, {
        skip: query.trim() === '',
    })

    const getDescription = (descricao: string) => {
        return descricao.length > 40 ? descricao.slice(0, 37) + '...' : descricao
    }

    const formatRating = (rating: number) => parseFloat(rating.toFixed(1))

    const placeholderImage = "https://via.placeholder.com/250x350"

    if (isLoadingTopRated || isFetching) return <div><Loader /></div>
    if (error) return <div>Erro ao carregar os filmes</div>

    const displayedMovies = query ? searchResults : movies


    return (
        <>
            <Header />
            <S.TitleSection>{query ? 'Resultados da Busca' : 'Melhores Avaliados'}</S.TitleSection>
            <S.Container>
                {displayedMovies.map((movie: Movie) => (
                    <S.Card key={movie.id} onClick={() => navigate(`/movies/details/${movie.tmdbId}`)}>
                        <span>
                            <Tag value={formatRating(movie.rating)} size={"big"} />
                        </span>
                        <img
                            src={movie.thumbnail || placeholderImage}
                            alt={movie.title}
                            onError={(e) => (e.currentTarget.src = placeholderImage)}
                        />
                        <p>{getDescription(movie.title)}</p>
                        <div>
                            <h4>Lançamento<br /> {movie.releaseDate}</h4>
                            <h4>Popularidade<br /> {movie.popularity}</h4>
                        </div>
                        <button>Saiba mais</button>
                    </S.Card>
                ))}
            </S.Container>
        </>
    )
}

export default Results
