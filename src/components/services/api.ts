import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Movie = {
    isFavorite: boolean
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

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/movies',
    }),
    endpoints: (builder) => ({
        getMovieDetails: builder.query<Movie, string>({
            query: (tmdbId) => `/details/${tmdbId}`,
        }),
        getFavorites: builder.query<Movie[], void>({
            query: () => '/favorites',
        }),
        deleteFavorite: builder.mutation<void, number>({
            query: (tmdbId) => ({
                url: `/tmdb/${tmdbId}`,
                method: 'DELETE',
            }),
        }),
        searchMovies: builder.query<Movie[], string>({
            query: (query) => `search?query=${encodeURIComponent(query)}`,
        }),
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
        addFavorite: builder.mutation<void, Movie>({
            query: (movie) => ({
                url: 'favorites',
                method: 'POST',
                body: movie,
            }),
        }),
        shareMovie: builder.query<string, void>({
            query: () => 'share',
        }),
    }),
})

export const {
    useSearchMoviesQuery,
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
    useGetFantasyMovieQuery,
    useGetMovieDetailsQuery,
    useAddFavoriteMutation,
    useShareMovieQuery,
    useGetFavoritesQuery,
    useDeleteFavoriteMutation,
} = api

export default api
