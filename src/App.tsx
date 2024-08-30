import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { GlobalCss } from './styles'
import { store } from './components/store/reducers/Cart'
import Home from './components/pages/Home'
import Details from './components/pages/Details'
import Rotas from './routes'

const App = () => (
  <Provider store={store}>
    <Router>
      <GlobalCss />
        <Rotas />
    </Router>
  </Provider>
)

export default App
