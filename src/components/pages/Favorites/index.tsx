import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Movie } from '../../../types'
import Header from '../../Header'
import { Container } from './styles'
import { IoIosArrowBack } from "react-icons/io"
import { GrShare } from "react-icons/gr"
import { MdOutlineDelete } from "react-icons/md"

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

const Favorites = () => {
    const [favorites, setFavorites] = useState<Movie[]>([])
    const [isFetching, setIsFetching] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/movies/favorites')
                if (!response.ok) throw new Error(`Erro na requisição: ${response.statusText}`)
                const data = await response.json()
                setFavorites(data)
            } catch (error) {
                console.error('Erro ao buscar filmes favoritos:', error)
            } finally {
                setIsFetching(false)
            }
        }

        fetchFavorites()
    }, [])

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

    const handleDeleteClick = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/movies/favorites/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
    
            setFavorites(favorites.filter(movie => movie.id !== id));
            console.log(`Filme com ID ${id} removido dos favoritos`);
        } catch (error) {
            console.error('Erro ao excluir filme dos favoritos:', error);
        }
    };
    
    if (isFetching) {
        return <div>Carregando...</div>
    }

    return (
        <>
            <Header />
            <IoIosArrowBack onClick={() => navigate('/')} style={{ marginLeft: '32px', fontSize: '40px', cursor: 'pointer' }} />
            <Container className='container'>
                {favorites.length > 0 ? (
                    favorites.map(movie => (
                        <div className='container' key={movie.tmdbId}>
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
                                <div style={{ width: '200px', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                                    <GrShare size={24} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={handleShareClick} />
                                    <MdOutlineDelete 
                                        size={32} 
                                        style={{ cursor: 'pointer', marginLeft: '16px' }} 
                                        onClick={() => handleDeleteClick(movie.id)} 
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Você não tem filmes favoritos ainda.</div>
                )}
            </Container>
        </>
    )
}

export default Favorites
