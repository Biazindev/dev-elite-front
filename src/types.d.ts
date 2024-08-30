declare export interface Movie {
    id: number
    title: string
    tmdbId: string
    overview: string
    rating: number
    thumbnail: string
    backdropPath: string
    releaseDate: string
    popularity: number
    adult: boolean
    video: boolean
    voteCount: number
    genreIds: number[]
  }