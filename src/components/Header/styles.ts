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
    background-color: ${colors.cinza};
    font-size: 24px;
    padding: 8px;
    padding-left: 48px;
    list-style: none;
    }
`