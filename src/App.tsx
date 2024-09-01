import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { store } from './components/store/reducers/Cart'
import Rotas from './routes'

import { GlobalCss } from './styles'


const App = () => (
  <Provider store={store}>
    <Router>
      <GlobalCss />
      <Rotas />
    </Router>
  </Provider>
)

export default App
