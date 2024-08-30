import { styled } from "styled-components"
import { colors } from "../../../styles"

export const Container = styled.div`
    margin: 0 auto;
    display: block;
    justify-content: center;


    img {
    width: 200px;
    height: auto;
    object-fit: cover;
    margin-right: 24px;
    border-radius: 8px;
    }

    > div {
    display: flex;
    background: linear-gradient(135deg, ${colors.preta} 0%, ${colors.cinza} 100%);
    margin: 24px auto;
    padding: 16px;
    border-radius: 16px;

    h1 {
    margin: 0 0 16px 4px;
    }

    p {
    font-size: 14px;
    padding: 4px;
    font-weight: 400;
    }
`