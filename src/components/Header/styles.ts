import styled from "styled-components"
import { colors } from "../../styles"

export const Container = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 90px;
    padding: 16px;
    background: linear-gradient(
    to bottom,
    ${colors.cinza} 0%,
    ${colors.cinza} 70%,
    ${colors.preta} 100%
  );

  .result {
    position: 'absolute',
    height: 'auto',
    width: '400px',
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid #ccc',
    borderRadius: '4px',
    zIndex: 1000,
    top: '60px',
    }

    svg {
    font-size: 40px;
    position: relative;
    left: 48px;
    top: 6px;
    }

    input {
    width: 520px;
    height: 48px;
    border-radius: 8px;
    background-color: ${colors.preta};
    font-size: 24px;
    padding: 8px;
    padding-left: 48px;
    border: none;
    color: ${colors.branca};
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
    
`