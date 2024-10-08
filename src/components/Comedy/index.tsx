import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"

import { Movie } from '../../types'
import { useGetComedyMovieQuery } from '../services/api'
import Tag from "../Tag"

import * as S from "../../styles"


import Loader from '../Loader'

const Comedy = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [allMovies, setAllMovies] = useState<Movie[]>([])
    const [isHoveredForward, setIsHoveredForward] = useState(false)
    const [isHoveredBackward, setIsHoveredBackward] = useState(false)
    const { data: movies = [], error, isLoading } = useGetComedyMovieQuery()
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const carouselRef = useRef<HTMLDivElement | null>(null)
    const navigate = useNavigate()

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
                if (isHoveredForward) handleNext()
                if (isHoveredBackward) handlePrev()
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

    const handleNext = () => {
        setCurrentIndex(prevIndex => {
            const nextIndex = prevIndex + 1
            if (nextIndex >= allMovies.length) {
                return 0
            }
            return nextIndex
        })
    }

    const handlePrev = () => {
        setCurrentIndex(prevIndex => {
            const newIndex = prevIndex - 1
            if (newIndex < 0) {
                return allMovies.length - 1
            }
            return newIndex
        })
    }

    const getDescription = (descricao: string) => {
        return descricao.length > 12 ? descricao.slice(0, 9) + '...' : descricao
    }

    const formatRating = (rating: number) => parseFloat(rating.toFixed(1))

    const placeholderImage = "https://via.placeholder.com/250x350"

    useEffect(() => {
        if (carouselRef.current) {
            const carousel = carouselRef.current
            const cardWidth = 160
            const margin = 16
            const totalCards = allMovies.length

            const totalWidth = (cardWidth + margin) * totalCards - margin
            carousel.style.width = `${totalWidth}px`
        }
    }, [allMovies.length])

    if (isLoading) return <div><Loader /></div>
    if (error) return <div>Erro ao carregar os filmes</div>

    return (
        <>
            <S.TitleSection style={{width: '200px'}}>Comédia</S.TitleSection>
            <S.Container>
                <S.Icons
                    onMouseEnter={() => setIsHoveredBackward(true)}
                    onMouseLeave={() => setIsHoveredBackward(false)}
                >
                    <IoIosArrowBack
                        onClick={handlePrev}
                        size={62}
                    />
                </S.Icons>
                <S.Carousel>
                    <S.CarouselWrapper ref={carouselRef} style={{ transform: `translateX(-${currentIndex * (160 + 16)}px)` }}>
                        {allMovies.map((movie: Movie) => (
                            <S.Card key={movie.id} onClick={() => {
                                navigate(`/movies/details/${movie.tmdbId}`)
                            }} >
                                <span>
                                    <Tag value={formatRating(movie.rating)} size={"small"} />
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
                    </S.CarouselWrapper>
                </S.Carousel>
                <S.Icons
                    onMouseEnter={() => setIsHoveredForward(true)}
                    onMouseLeave={() => setIsHoveredForward(false)}
                >
                    <IoIosArrowForward
                        onClick={handleNext}
                        size={62}
                    />
                </S.Icons>
            </S.Container>
        </>
    )
}

export default Comedy
