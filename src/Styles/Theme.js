import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import sfMedium from "./fonts/sf-compact-medium.woff";

const theme = {
  colors: {
    red: "#cc0028",
    black: "#000",
    white: "#fff",
    blackrgb: "rgba(0,0,0,.87)",
  },
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
    tag: "0.75rem",
  },
  fontFamily: {
    sf: "sfMedium",
  },
};

const GlobalFonts = createGlobalStyle`
    @font-face {
        font-family: 'sfMedium';
        src: local('sfMedium'), local('sfMedium'),
        url(${sfMedium}) format('woff2'),
        url(${sfMedium}) format('woff');
        font-weight: 300;
        font-style: normal;
    },
    * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  li, ol, ul {
    margin: 0;
    border: 0;
    vertical-align: baseline;
    } 
  }
`;

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalFonts />
    {children}
  </ThemeProvider>
);

export default Theme;
