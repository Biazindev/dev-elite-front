import { Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home'
import Details from './components/pages/Details'
import Favorites from './components/pages/Favorites'
import Results from './components/pages/Results/index'
import MoviesList from './components/pages/MoviesList'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movies/details/:tmdbId" element={<Details />} />
    <Route path="/favorites" element={<Favorites />} />
    <Route path="/results" element={<Results />} />
    <Route path="/genres" element={<MoviesList />} />
  </Routes>
)

export default Rotas
