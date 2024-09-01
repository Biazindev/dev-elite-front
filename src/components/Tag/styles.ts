import { styled } from "styled-components"

import { Props } from "."

import { colors } from "../../styles"


export const TagContainer = styled.div<Props>`
    left: ${props => (props.size === 'small' ? '82px' : '240px')};
    top: 40px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    background-color: ${colors.preta};
    opacity: 90%;
    color: #A3A3A3;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    width: 78px;
    height: 50px;
    text-align: center;
    align-items: center;
    position: relative;
    z-index: 1;
    justify-content: end;

    svg {
    color: ${colors.yellowButton};
    font-size: 30px;
    }


    div {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
    font-size: 24px;
    color: ${colors.branca};
    }

    span {
    font-size: 32px
    margin-right: 4px;
    }
    }
`
