import { styled } from "styled-components"
import { colors } from "../../../styles"


export const TitleSection = styled.h1`
    width: 360px;
    border-bottom: 8px solid ${colors.branca};
    padding: 0 0 0 56px;
    margin: 24px 0 24px;
`

export const Container = styled.div`
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    max-width: 1166px;
    justify-content: space-around;
`

export const Card = styled.div`
    background: linear-gradient(135deg, ${colors.preta} 0%, ${colors.cinza} 100%);
    width: 350px;
    margin: 32px 16px;
    padding: 16px;
    border-radius: 8px;
    height: 500px;
    cursor: pointer;
    transition: height 0.3s ease-in-out;
    z-index: 1;

    &:hover {
        transform: scale(1.10);
        background-color: #5758BB;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }

    img {
    width: 100%;
    height: 300px;
    border-radius: 8px;
    position: relative;
    top: -32px;
    }

    p {
    font-size: 16px;
    font-weight: bold;
    }

    div {
    display: flex;
    padding: 8px 0;
    justify-content: space-between;
    margin-bottom: .5rem;
    h4 {
        font-weight: 400;
        font-size: 12px;
    }
    }

    button {
    width: 100%;
    height: 32px;
    background-color: ${colors.yellowButton};
    list-styles: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    color: ${colors.preta};
    cursor: pointer;
    margin-top: 8px;
    }
`

export const Carousel = styled.div`
    display: flex;
    overflow: hidden;
    width: 100%;
`

export const CarouselWrapper = styled.div`
    display: flex;
    transition: transform 0.3s ease-in-out;
    will-change: transform;
    width: fit-content;
`

export const Icons = styled.div`
    margin: 0 auto;
    display: flex;
    align-items: center;
    background-color: transparent;
    cursor: pointer;
`