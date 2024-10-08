export declare interface Movie {
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

export declare interface genreMap {
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