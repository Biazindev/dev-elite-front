import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io"
import { GrShare } from "react-icons/gr"
import { MdOutlineDelete } from "react-icons/md"
import { useEffect } from 'react'

import Header from '../../Header'
import { useGetFavoritesQuery, useDeleteFavoriteMutation } from '../../services/api'
import Loader from '../../Loader'

import { Container, Tooltip } from './styles'

const formatReleaseDate = (date: string) => {
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
}

const Favorites = () => {
    const navigate = useNavigate()
    const { data: favorites = [], isLoading, refetch } = useGetFavoritesQuery()
    const [deleteFavorite] = useDeleteFavoriteMutation()

    useEffect(() => {
        refetch()
    }, [refetch])


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

    const handleDeleteClick = async (tmdbId: string | number) => {
        try {
            await deleteFavorite(Number(tmdbId)).unwrap()
            refetch()
        } catch (error) {
            console.error('Erro ao excluir filme dos favoritos:', error)
        }
    }

    if (isLoading) {
        return <div><Loader /></div>
    }

    return (
        <>
            <Header />
            <IoIosArrowBack onClick={() => navigate('/')} style={{ marginLeft: '32px', fontSize: '40px', cursor: 'pointer' }} />
            <Container className='container'>
                {favorites.length > 0 ? (
                    favorites.map(movie => (
                        <div className='container' key={movie.id}>
                            <img src={movie.thumbnail || 'https://via.placeholder.com/250x350'} alt={movie.title} />
                            <div>
                                <h1>{movie.title}</h1>
                                <p>ID do Filme: <span>{movie.tmdbId}</span></p>
                                <p>Descrição: <span>{movie.overview}</span></p>
                                <p>Data de Lançamento: <span>{formatReleaseDate(movie.releaseDate)}</span></p>
                                <p>Popularidade: <span>{movie.popularity}</span></p>
                                <p>Quantidade de Votos: <span>{movie.voteCount}</span></p>
                                <p>Avaliação: <span>{movie.rating}</span></p>
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
