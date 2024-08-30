import { useNavigate } from 'react-router-dom'
import Header from '../../Header'
import { Container, Tooltip } from './styles'
import { IoIosArrowBack } from "react-icons/io"
import { GrShare } from "react-icons/gr"
import { MdOutlineDelete } from "react-icons/md"
import { useGetFavoritesQuery, useDeleteFavoriteMutation, useShareMovieQuery } from '../../services/api'

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
    const navigate = useNavigate()
    const { data: favorites = [], isLoading, refetch } = useGetFavoritesQuery()
    const [deleteFavorite] = useDeleteFavoriteMutation()
    const { refetch: shareMovie } = useShareMovieQuery()

    const getGenres = (genreIds: number[]) => {
        return genreIds.map(id => genreMap[id] || 'Desconhecido').join(', ')
    }

    const handleShareClick = async () => {
        try {
            const shareLink = await shareMovie().unwrap()

            if (navigator.share) {
                await navigator.share({
                    title: 'Confira meus filmes favoritos!',
                    text: 'Veja esta lista de filmes que estou recomendando!',
                    url: shareLink,
                })
                console.log('Compartilhamento bem-sucedido!')
            } else {
                await navigator.clipboard.writeText(shareLink)
                alert('Link copiado para a área de transferência!')
            }
        } catch (error) {
            console.error('Erro ao buscar link de compartilhamento:', error)
        }
    }

    const handleDeleteClick = async (tmdbId: string | number) => {
        try {
            await deleteFavorite(Number(tmdbId)).unwrap()
            refetch()
        } catch (error) {
            console.error('Erro ao excluir filme dos favoritos:', error)
        }
    }

    if (isLoading) {
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
                                    <Tooltip data-tip="Compartilhe">
                                        <GrShare size={24} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={handleShareClick} />
                                    </Tooltip>
                                    <Tooltip data-tip="Excluir">
                                        <MdOutlineDelete 
                                            size={32} 
                                            style={{ cursor: 'pointer', marginLeft: '16px' }} 
                                            onClick={() => handleDeleteClick(movie.tmdbId)} 
                                        />
                                    </Tooltip>
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
