import { Container } from "./styles"
import { PiMagnifyingGlassThin } from "react-icons/pi"

const Header = () => {
    return (
            <Container>
            <PiMagnifyingGlassThin/>
            <input placeholder="Busque por filmes, séries, tv e mais..." type="text" ></input>
            </Container>
    )
}

export default Header