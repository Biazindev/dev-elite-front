import { styled } from "styled-components"
import { breakpoints, colors } from "../../../styles"

export const Container = styled.div`
    margin: 0 auto;
    display: block;
    justify-content: center;
    margin-bottom: 80px;

    @media(min-width: ${breakpoints.tablet}) {
        display: flex;
    }

    img {
    width: 100%;
    height: auto;
    object-fit: cover;
    margin-right: 24px;

    @media(min-width: ${breakpoints.tablet}) {
        width: 350px;
    }
    }

    h1 {
    margin: 0 0 24px 4px;
    color: ${colors.yellowButton};
    }

    p {
    margin-bottom: 8px;
    font-weight: 400;
    color: ${colors.branca};

    span {
    color: ${colors.blue};
    margin-left: 8px;
    line-height: 32px;
    }
    }
`

export const Favorite = styled.p`
    align-items: center;
    display: flex;

    span {
    position: relative;
    top: 5px;
    width: 180px;
    margin-left: 8px;
    }
`
export const Tooltip = styled.div`
    position: relative;
    display: inline-block;

    &::after {
        content: attr(data-tip);
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        background-color: black;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease-in-out;
        white-space: nowrap;
    }

    &:hover::after {
        opacity: 1;
    }
`
