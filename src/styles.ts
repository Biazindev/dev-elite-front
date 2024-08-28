import { createGlobalStyle } from 'styled-components'

export const colors = {
  branca: '#EEEEEE',
  preta: '#111',
  cinza: '#2C3A47',
  verde: '#10AC84',
  CinzaClaro: '#A3A3A3'
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
