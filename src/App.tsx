import { Provider } from "react-redux"
import Home from "./components/pages/Home"
import { GlobalCss } from "./styles"
import { store } from "./components/store/reducers/Cart"


function App() {
  return (
    <Provider store={store}>
      <GlobalCss />
      <Home />
    </Provider>
  )
}

export default App
