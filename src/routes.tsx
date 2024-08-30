import { Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Details from './components/pages/Details'
import Favorites from './components/pages/Favorites'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movies/details/:tmdbId" element={<Details />} />
    <Route path="/favorites" element={<Favorites />} />
  </Routes>
)

export default Rotas
