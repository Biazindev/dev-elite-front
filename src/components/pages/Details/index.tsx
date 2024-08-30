import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Movie } from '../../../types'
import Header from '../../Header'
import { Container, Favorite, Tooltip } from './styles'
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { IoIosArrowBack } from "react-icons/io"
import { GrShare } from "react-icons/gr"
import { useGetMovieDetailsQuery, useAddFavoriteMutation } from '../../services/api'

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

const formatReleaseDate = (date: string) => {
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
}

const Details: React.FC = () => {
    const [movie, setMovie] = useState<Movie | null>(null)
    const [isFavorite, setIsFavorite] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const { tmdbId } = useParams<{ tmdbId: string }>()
    const navigate = useNavigate()
    const [addFavorite] = useAddFavoriteMutation()
    const { data: movieDetails, isFetching } = useGetMovieDetailsQuery(tmdbId || '')

    useEffect(() => {
        if (movieDetails) {
            setMovie(movieDetails)
        }
    }, [movieDetails])

    useEffect(() => {
        if (movie) {
            const checkFavoriteStatus = async () => {
                try {
                    const url = `http://localhost:8080/api/movies/favorites/${movie.tmdbId}`
                    console.log('URL para verificar favorito:', url)
                    const response = await fetch(url)
                    const isFavorite = await response.json()
                    setIsFavorite(isFavorite)
                } catch (error) {
                    console.error('Erro ao verificar status de favorito:', error)
                }
            }
            checkFavoriteStatus()
        }
    }, [movie])

    const getGenres = (genreIds: number[] | undefined) => {
        if (!genreIds) {
            return 'Gêneros não disponíveis'
        }
        return genreIds.map(id => genreMap[id] || 'Desconhecido').join(', ')
    }

    const handleShareClick = async () => {
        try {
            const url = 'http://localhost:8080/api/movies/share'
            console.log('URL para compartilhar:', url)
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`)
            }
            const shareLink = await response.text()

            if (navigator.share) {
                navigator.share({
                    title: 'Confira meus filmes favoritos!',
                    text: 'Veja esta lista de filmes que estou recomendando!',
                    url: shareLink,
                })
                .then(() => console.log('Compartilhamento bem-sucedido!'))
                .catch((error) => console.error('Erro ao compartilhar:', error))
            } else {
                navigator.clipboard.writeText(shareLink)
                    .then(() => alert('Link copiado para a área de transferência!'))
                    .catch((error) => console.error('Erro ao copiar link:', error))
            }
        } catch (error) {
            console.error('Erro ao buscar link de compartilhamento:', error)
        }
    }

    const handleFavoriteClick = async () => {
        if (movie) {
            try {
                const url = `http://localhost:8080/api/movies/favorites/${movie.tmdbId}`
                console.log('URL para adicionar/remover favorito:', url)

                const newFavoriteStatus = !isFavorite
                setIsFavorite(newFavoriteStatus)

                await addFavorite({
                    tmdbId: movie.tmdbId,
                    title: movie.title,
                    overview: movie.overview,
                    releaseDate: movie.releaseDate,
                    thumbnail: movie.thumbnail,
                    backdropPath: movie.backdropPath,
                    rating: movie.rating,
                    popularity: movie.popularity,
                    voteCount: movie.voteCount,
                    genreIds: movie.genreIds,
                    isFavorite: newFavoriteStatus,
                    id: movie.id || 0,
                    adult: movie.adult || false,
                    video: movie.video || false,
                })

                setMessage(`Filme ${movie.title} ${newFavoriteStatus ? '' : 'adicionado aos favoritos'}`)
            } catch (error) {
                setMessage('Erro ao atualizar status de favorito: ' + error)
            }
        }
    }

    if (isFetching) {
        return <div>Carregando...</div>
    }

    if (!movie && !isFetching) {
        return <div>Filme não encontrado...</div>
    }

    return (
        <>
            <Header />
            <IoIosArrowBack onClick={() => navigate('/')} style={{ marginLeft: '32px', fontSize: '40px', cursor: 'pointer' }} />
            <Container className='container'>
                {movie && (
                    <>
                        <img src={movie.thumbnail || 'https://via.placeholder.com/250x350'} alt={movie.title} />
                        <div>
                            <h1>{movie.title}</h1>
                            <p>ID do Filme: {movie.tmdbId}</p>
                            <p>Descrição: {movie.overview}</p>
                            <p>Data de Lançamento: {formatReleaseDate(movie.releaseDate)}</p>
                            <p>Popularidade: {movie.popularity}</p>
                            <p>Quantidade de Votos: {movie.voteCount}</p>
                            <p>Avaliação: {movie.rating}</p>
                            <p>Gêneros: {movie.genreIds ? getGenres(movie.genreIds) : 'Gêneros não disponíveis'}</p>
                            <div style={{ width: '180px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Tooltip data-tip="Adicione aos favoritos">
                                    <Favorite 
                                        onClick={handleFavoriteClick}
                                        style={{ color: isFavorite ?'inherit' : 'red', cursor: 'pointer' }}
                                    >
                                        {isFavorite ? <FaHeart size={24}/> : <FaRegHeart size={24}/>}
                                        <span>{message}</span>
                                    </Favorite>
                                </Tooltip>
                                <Tooltip data-tip="Compartilhe">
                                    <GrShare size={24} style={{ cursor: 'pointer' }} onClick={handleShareClick} />
                                </Tooltip>
                            </div>
                        </div>
                    </>
                )}
            </Container>
        </>
    )
}

export default Details
