import { styled } from "styled-components"

export const Container = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;

    img {
    width: 350px;
    height: 450px;
    object-fit: cover;
    margin-right: 24px;
    }

    h1 {
    margin: 0 0 32px 4px;
    }

    p {
    padding: 8px;
    font-weight: 400;
    }
`

export const Favorite = styled.p`
    align-items: center;
    display: flex;

    span {
    margin-right: 8px;
    }
`