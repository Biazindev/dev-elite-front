import { useState, useEffect, useRef } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import Tag from "../Tag"
import { Card, Container, Carousel, CarouselWrapper, Icons, TitleSection } from "./styles"
import { Movie } from '../../types'
import { useGetSuspenseMovieQuery } from '../services/api'

const Suspense = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [allMovies, setAllMovies] = useState<Movie[]>([])
    const [isHoveredForward, setIsHoveredForward] = useState(false)
    const [isHoveredBackward, setIsHoveredBackward] = useState(false)
    const { data: movies = [], error, isLoading } = useGetSuspenseMovieQuery()
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const carouselRef = useRef<HTMLDivElement | null>(null)

    const isValidMovie = (movie: Movie) => {
        const hasImage = movie.thumbnail && movie.thumbnail !== ''
        return hasImage
    }

    useEffect(() => {
        if (movies.length > 0) {
            const filteredMovies = movies.filter(isValidMovie)
            setAllMovies(filteredMovies)
        }
    }, [movies])

    useEffect(() => {
        if (isHoveredForward) {
            intervalRef.current = setInterval(() => {
                handleNext()
            }, 1000)
        } else if (isHoveredBackward) {
            intervalRef.current = setInterval(() => {
                handlePrev()
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
        if (descricao.length > 12) {
            return descricao.slice(0, 9) + '...'
        }
        return descricao
    }

    const formatRating = (rating: number) => {
        return parseFloat(rating.toFixed(1))
    }

    const placeholderImage = "https://via.placeholder.com/250x350"

    useEffect(() => {
        if (carouselRef.current) {
            const carousel = carouselRef.current
            const cardWidth = 100
            const margin = 16
            const totalCards = allMovies.length

            const totalWidth = (cardWidth + margin) * totalCards - margin
            carousel.style.width = `${totalWidth}px`
        }
    }, [allMovies])

    if (isLoading) return <div>Carregando...</div>
    if (error) return <div>Erro ao carregar os filmes</div>

    return (
        <>
            <TitleSection>Suspense</TitleSection>
            <Container>
                <Icons
                    onMouseEnter={() => setIsHoveredBackward(true)}
                    onMouseLeave={() => setIsHoveredBackward(false)}
                >
                    <IoIosArrowBack 
                        onClick={handlePrev} 
                        size={62} 
                    />
                </Icons>
                <Carousel>
                    <CarouselWrapper ref={carouselRef} style={{ transform: `translateX(-${currentIndex * (160 + 16)}px)` }}>
                        {allMovies.map((movie: Movie, index: number) => (
                            <Card key={index}>
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
                                    <h4>Lançamento<br/> {movie.releaseDate}</h4>
                                    <h4>Popularidade<br/> {movie.popularity}</h4>
                                </div>
                                <button>Saiba mais</button>
                            </Card>
                        ))}
                    </CarouselWrapper>
                </Carousel>
                <Icons
                    onMouseEnter={() => setIsHoveredForward(true)}
                    onMouseLeave={() => setIsHoveredForward(false)}
                >
                    <IoIosArrowForward 
                        onClick={handleNext} 
                        size={62} 
                    />
                </Icons>
            </Container>
        </>
    )
}

export default Suspense
