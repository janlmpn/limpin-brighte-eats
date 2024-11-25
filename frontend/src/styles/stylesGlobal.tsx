import { css, Global } from '@emotion/react';
import 'typeface-roboto'

const globalStyles = (
  <Global styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      #root {
        display: flex;
        flex: 1;
      }

      body {
        font-family: 'Roboto', sans-serif;
        background-color: #f9f9f9;
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }

      a {
        text-decoration: none;
        color: inherit;
      }
    `}
  />
);

export default globalStyles;
