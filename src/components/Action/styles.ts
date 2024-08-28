import { styled } from "styled-components"
import { colors } from "../../styles"

export const Container = styled.div`
    display: flex;
    padding: 48px;
`

export const Card = styled.div`
    background-color: ${colors.cinza};
    margin: 16px;
    padding: 16px;
    border-radius: 8px;

    img {
    border-radius: 8px;
    position: relative;
    top: -32px;
    }

    div {
    display: flex;
    padding: 16px 0;
    justify-content: space-between;
    }

    button {
    width: 100%;
    height: 32px;
    }
`