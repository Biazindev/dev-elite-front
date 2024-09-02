import styled from "styled-components"

import { breakpoints, colors } from "../../styles"

export const Container = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: end;
    width: 100%;
    height: 100px;
    padding: 32px 0;
    background: linear-gradient(
    to bottom,
    ${colors.cinza} 0%,
    ${colors.cinza} 70%,
    ${colors.preta} 100%
  );

    div {
      margin: 0 auto;
      display: block;

    input {
    width: 280px;
    height: 48px;
    border-radius: 8px;
    background-color: ${colors.preta};
    font-size: 24px;
    padding: 8px;
    padding-left: 48px;
    border: none;
    color: ${colors.branca};

    @media(min-width: ${breakpoints.tablet}) {
        width: 520px;
    }
    }
    }

    .loading-indicator {
    position: absolute;
    top: 60px;
    left: 0;
    width: 400px;
    background-color: transparent;
    color: black;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 1000;
    padding: 8px;
    text-align: center;
}

@media(min-width: ${breakpoints.tablet}) {
        margin: 0 auto;
        justify-content: center;
        
    }
    
`

export const StyledSelect = styled.select`
    padding: 12px;
    border-radius: 8px;
    background-color: #fff;
    font-size: 32px;
    width: 140px;
    border: none;
    outline: none;
    transition: all 0.3s ease;
    background-color: transparent;
    color: ${colors.branca};

    &:hover, &:focus {
        border-color: #007BFF;
    }
`

export const StyledOption = styled.option`
    font-size: 24px;
    color: #333;
    display: block;
`
export const MenuButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0;

    @media(min-width: ${breakpoints.tablet}) {
        padding: 10px;
    }
`

export const Menu = styled.div`
    position: absolute;
    top: 60px;
    left: 25px;
    width: 200px;
    background-color: ${colors.preta};
    color: ${colors.branca};
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    padding: 10px;

    @media(min-width: ${breakpoints.tablet}) {
        top: 50px;
        left: 200px;
    }
`

export const MenuItem = styled.div`
    cursor: pointer;
    border-bottom: 1px solid ${colors.cinza};
    padding: 24px;
    font-size: 24px;
    font-weight: bold;


    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: ${colors.cinza};
    }
`

export const IconBar = styled.div`
    margin-left: 40px;

    > svg {
      font-size: 40px;
      position: relative;
      left: 8px;
      top: 50px;
    }
`