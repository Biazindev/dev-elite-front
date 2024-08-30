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
    position: relative;
    top: 5px;
    width: 250px;
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
