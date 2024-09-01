import { configureStore } from '@reduxjs/toolkit'
import api from '../../services/api'
import moviesReducer from '../index'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        movies: moviesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false, }).concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

