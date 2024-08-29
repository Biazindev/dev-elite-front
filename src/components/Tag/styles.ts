import { styled } from "styled-components"
import { Props } from "."


export const TagContainer = styled.div<Props>`
    left: 112px;
    top: 10px;
    margin-left: 8px;
    background-color: #000;
    opacity: 90%;
    color: #A3A3A3;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    width: 40px;
    height: 26px;
    text-align: center;
    align-items: center;
    position: relative;
    z-index: 1;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 1.0);

    div {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
    font-size: 24px
    margin-right: 4px;
    }
    }
`
