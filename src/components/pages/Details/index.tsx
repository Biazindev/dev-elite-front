import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { IoIosArrowBack } from "react-icons/io"
import { GrShare } from "react-icons/gr"
import { MdOutlineDelete } from "react-icons/md"

import Loader from '../../Loader'
import { Movie } from '../../../types'
import Header from '../../Header'
import {
    useGetMovieDetailsQuery,
    useAddFavoriteMutation,
    useDeleteFavoriteMutation
} from '../../services/api'

import * as S from './styles'


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
    const [deleteFavorite] = useDeleteFavoriteMutation()
    const { data: movieDetails, isFetching } = useGetMovieDetailsQuery(tmdbId || '')

    useEffect(() => {
        if (movieDetails) {
            console.log('Detalhes do filme:', movieDetails)
            setMovie(movieDetails)
        }
    }, [movieDetails])

    useEffect(() => {
        if (movie) {
            const checkFavoriteStatus = async () => {
                try {
                    const url = `https://dev-elite-backend-java.onrender.com/api/movies/favorites/${movie.tmdbId}`
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

    const handleShareClick = async () => {
        try {
            const url = 'https://dev-elite-backend-java.onrender.com/api/movies/share'
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
                const url = `https://dev-elite-backend-java.onrender.com/api/movies/favorites/${movie.tmdbId}`
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
                    genreIds: movie.genreIds || [],
                    isFavorite: newFavoriteStatus,
                    id: movie.id || 0,
                    adult: movie.adult || false,
                    video: movie.video || false,
                })

                setMessage(`Filme ${movie.title} ${newFavoriteStatus ? 'adicionado aos favoritos' : 'adicionado aos favoritos'}`)
            } catch (error) {
                setMessage('Erro ao atualizar status de favorito: ' + error)
            }
        }
    }

    const handleDeleteClick = async (tmdbId: string | number) => {
        try {
            await deleteFavorite(Number(tmdbId))
            setMessage('Filme removido dos favoritos com sucesso.')
        } catch (error) {
            setMessage('Erro ao excluir filme dos favoritos.')
        }
    }

    const formatRating = (rating: number) => parseFloat(rating.toFixed(1))

    if (isFetching) {
        return <div><Loader /></div>
    }

    if (!movie && !isFetching) {
        return <div><Loader /></div>
    }

    return (
        <>
            <Header />
            <IoIosArrowBack onClick={() => navigate('/')} style={{ marginLeft: '32px', fontSize: '40px', cursor: 'pointer' }} />
            <S.Container className='container'>
                {movie && (
                    <>
                        <img src={movie.thumbnail || 'https://via.placeholder.com/250x350'} alt={movie.title} />
                        <div key={movie.id}>
                            <h1>{movie.title}</h1>
                            <p>ID do Filme: <span>{movie.tmdbId}</span></p>
                            <p>Descrição: <span>{movie.overview}</span></p>
                            <p>Data de Lançamento: <span>{formatReleaseDate(movie.releaseDate)}</span></p>
                            <p>Popularidade: <span>{movie.popularity}</span></p>
                            <p>Quantidade de Votos: <span>{movie.voteCount}</span></p>
                            <p>Avaliação: <span>{formatRating(movie.rating)}</span></p>
                            <div style={{ width: '180px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <S.Tooltip data-tip="Adicione aos favoritos">
                                    <S.Favorite
                                        onClick={handleFavoriteClick}
                                        style={{ color: isFavorite ? '#ff4d4d' : '#ff4d4d', cursor: 'pointer' }}
                                    >
                                        {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                                        <span>{message}</span>
                                    </S.Favorite>
                                </S.Tooltip>
                                <S.Tooltip data-tip="Excluir">
                                    <MdOutlineDelete
                                        size={32}
                                        style={{ cursor: 'pointer', marginRight: '60px' }}
                                        onClick={() => handleDeleteClick(movie.tmdbId)}
                                    />
                                </S.Tooltip>
                                <S.Tooltip data-tip="Compartilhe">
                                    <GrShare size={24} style={{ cursor: 'pointer' }} onClick={handleShareClick} />
                                </S.Tooltip>
                            </div>
                        </div>
                    </>
                )}
            </S.Container>
        </>
    )
}

export default Details
