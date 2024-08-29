import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface Movie {
    id: number
    title: string
    translatedTitle?: string
    rating: number
    thumbnail: string
    releaseDate: string
    popularity: number
}

interface MoviesState {
    movies: Movie[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: MoviesState = {
    movies: [],
    status: 'idle',
    error: null,
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await fetch('http://localhost:8080/api/movies/search?query=acao')
    return (await response.json()) as Movie[]
})

export const translateTitles = createAsyncThunk(
    'movies/translateTitles',
    async (movies: Movie[]) => {
        const translatedMovies = await Promise.all(
            movies.map(async (movie) => {
                const response = await fetch('https://libretranslate.de/translate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        q: movie.title,
                        source: 'auto',
                        target: 'pt',
                    }),
                })
                const data = await response.json()
                return { ...movie, translatedTitle: data.translatedText }
            })
        )
        return translatedMovies
    }
)

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.movies = action.payload
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Erro ao carregar filmes'
            })
            .addCase(translateTitles.fulfilled, (state, action) => {
                state.movies = action.payload
            })
    },
})

export default moviesSlice.reducer
