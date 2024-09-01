import { styled } from "styled-components"
import { breakpoints, colors } from "../../../styles"

export const Container = styled.div`
    margin: 0 auto;
    display: block;
    justify-content: center;


    img {
    width: 100%;
    height: auto;
    object-fit: cover;
    margin-right: 24px;
    border-radius: 8px;

    @media(min-width: ${breakpoints.tablet}) {
        width: 200px;
    }
    }

    > div {
    display: block;
    background: linear-gradient(135deg, ${colors.preta} 0%, ${colors.cinza} 100%);
    margin: 24px auto;
    padding: 16px;
    border-radius: 16px;

    @media(min-width: ${breakpoints.tablet}) {
        display: flex;
    }

    h1 {
    margin: 0 0 16px 4px;
    color: ${colors.yellowButton};
    }

    p {
    font-size: 14px;
    padding: 4px;
    font-weight: 400;
    color: ${colors.branca};

    span {
    color: ${colors.blue};
    line-height: 24px;
    margin-left: 8px;
    }
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
