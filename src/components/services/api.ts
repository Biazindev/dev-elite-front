import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Movie = {
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

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/movies',
    }),
    endpoints: (builder) => ({
        getActionMovie: builder.query<Movie[], void>({
            query: () => 'search?query=acao',
        }),
        getAdventureMovie: builder.query<Movie[], void>({
            query: () => 'search?query=aventura',
        }),
        getComedyMovie: builder.query<Movie[], void>({
            query: () => 'search?query=comedia',
        }),
        getDramaMovie: builder.query<Movie[], void>({
            query: () => 'search?query=drama',
        }),
        getFictionMovie: builder.query<Movie[], void>({
            query: () => 'search?query=ficcao',
        }),
        getTerrorMovie: builder.query<Movie[], void>({
            query: () => 'search?query=terror',
        }),
        getAnimationMovie: builder.query<Movie[], void>({
            query: () => 'search?query=animacao',
        }),
        getDocumentariesMovie: builder.query<Movie[], void>({
            query: () => 'search?query=documentaries',
        }),
        getWesternMovie: builder.query<Movie[], void>({
            query: () => 'search?query=faroeste',
        }),
        getSuspenseMovie: builder.query<Movie[], void>({
            query: () => 'search?query=suspense',
        }),
        getFantasyMovie: builder.query<Movie[], void>({
            query: () => 'search?query=fantasia',
        }),
    }),
})

export const 
{ 
  useGetActionMovieQuery, 
  useGetAdventureMovieQuery, 
  useGetComedyMovieQuery, 
  useGetDramaMovieQuery,
  useGetFictionMovieQuery,
  useGetTerrorMovieQuery,
  useGetAnimationMovieQuery,
  useGetDocumentariesMovieQuery,
  useGetWesternMovieQuery,
  useGetSuspenseMovieQuery,
  useGetFantasyMovieQuery
} = api
export default api
