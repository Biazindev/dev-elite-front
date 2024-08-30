import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Movie } from '../../../types'
import Header from '../../Header'
import { Container, Favorite } from './styles'
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { IoIosArrowBack } from "react-icons/io"
import { GrShare } from "react-icons/gr"

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

const Details = () => {
    const [allMovies, setAllMovies] = useState<Movie[]>([])
    const [movie, setMovie] = useState<Movie | null>(null)
    const [isFavorite, setIsFavorite] = useState(false)
    const { tmdbId } = useParams<{ tmdbId: string }>()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/movies/search?query=a%C3%A7%C3%A3o')
                const data = await response.json()
                setAllMovies(data)
            } catch (error) {
                console.error('Erro ao buscar filmes:', error)
            }
        }

        fetchMovies()
    }, [])

    useEffect(() => {
        if (tmdbId) {
            const foundMovie = allMovies.find(movie => movie.tmdbId === tmdbId)
            setMovie(foundMovie || null)
        }
    }, [tmdbId, allMovies])

    const getGenres = (genreIds: number[]) => {
        return genreIds.map(id => genreMap[id] || 'Desconhecido').join(', ')
    }

    const handleShareClick = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/movies/share')
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
                const newFavoriteStatus = !isFavorite
                setIsFavorite(newFavoriteStatus)
    
                const response = await fetch('http://localhost:8080/api/movies/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tmdbId: movie.tmdbId,
                        title: movie.title,
                        overview: movie.overview,
                        releaseDate: movie.releaseDate,
                        thumbnail: movie.thumbnail,
                        backdropPath: movie.backdropPath,
                        rating: movie.rating,
                        popularity: movie.popularity,
                        voteCount: movie.voteCount,
                        genreIds: movie.genreIds
                    }),
                })
    
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.statusText}`)
                }
    
                console.log(`Filme ${movie.tmdbId} ${newFavoriteStatus ? 'adicionado aos favoritos' : 'removido dos favoritos'}`)
            } catch (error) {
                console.error('Erro ao atualizar status de favorito:', error)
            }
        }
    }
    
    if (!movie) {
        return <div>Filme não encontrado ou carregando...</div>
    }

    return (
        <>
        <Header />
        <IoIosArrowBack onClick={() => navigate('/')} style={{ marginLeft: '32px', fontSize: '40px', cursor: 'pointer' }} />
            <Container className='container'>
                <img src={movie.thumbnail || 'https://via.placeholder.com/250x350'} alt={movie.title} />
                <div>
                    <h1>{movie.title}</h1>
                    <p>ID do Filme: {movie.tmdbId}</p>
                    <p>Descrição: {movie.overview}</p>
                    <p>Data de Lançamento: {formatReleaseDate(movie.releaseDate)}</p>
                    <p>Popularidade: {movie.popularity}</p>
                    <p>Quantidade de Votos: {movie.voteCount}</p>
                    <p>Avaliação: {movie.rating}</p>
                    <p>Gêneros: {getGenres(movie.genreIds)}</p>
                <div style={{ width: '180px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Favorite 
                        onClick={handleFavoriteClick}
                        style={{ color: isFavorite ? 'red' : 'inherit', cursor: 'pointer' }}
                    >
                        {isFavorite ? <FaHeart size={24}/> : <FaRegHeart size={24}/>}
                    </Favorite>
                    <GrShare size={24} style={{ cursor: 'pointer' }} onClick={handleShareClick} />
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Details
