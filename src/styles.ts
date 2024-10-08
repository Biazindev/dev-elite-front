import styled, { createGlobalStyle } from 'styled-components'

export const colors = {
    branca: '#EEEEEE',
    preta: '#111',
    cinza: '#2C3A47',
    verde: '#10AC84',
    CinzaClaro: '#A3A3A3',
    yellowButton: '#f1c40f',
    blue: '#82ccdd'
}

export const breakpoints = {
    mobileSmall: '320px',
    mobile: '576px',
    tablet: '768px',
    laptop: '992px',
    desktop: '1024px',
}


export const GlobalCss = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Roboto, sans-serif;
        list-style: none;
    }
        body {
            background-color: ${colors.preta};
            color: ${colors.branca};
        }

        .container {
            max-width: 1024px;
            width: 100%;
            margin: 0 auto;
            overflow: hidden;
            
            @media(max-width: ${breakpoints.desktop}) {
                max-width: 80%;
                
            }
        }
`
export const TitleSection = styled.h1`
    width: 180px;
    border-bottom: 8px solid ${colors.branca};
    padding: 0 56px;
    margin: 24px 0;
`

export const Container = styled.div`
    display: flex;
    overflow: hidden;
`

export const Card = styled.div`
    background: linear-gradient(135deg, ${colors.preta} 0%, ${colors.cinza} 100%);
    margin: 32px 16px;
    padding: 16px;
    border-radius: 8px;
    height: 490px;
    cursor: pointer;
    transition: height 0.3s ease-in-out;
    z-index: 1;

    &:hover {
        transform: scale(1.10);
        background-color: #5758BB;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }

    img {
    width: 160px;
    height: 300px;
    border-radius: 8px;
    position: relative;
    top: -32px;
    }
    span {
    }

    p {
    font-size: 16px;
    font-weight: bold;
    }

    div {
    display: flex;
    padding: 8px 0;
    justify-content: space-between;

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