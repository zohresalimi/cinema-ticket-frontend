import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import sfMedium from "./fonts/sf-compact-medium.woff";

const theme = {
  colors: {
    red: "#cc0028",
    darkRed: "#9a0320",
    black: "#000",
    white: "#fff",
    blackrgb: "rgba(0,0,0,.87)",
    textColor: "#d2d2d2",
    gray: "#6d6d6d",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.5rem",
    large: "2rem",
    tag: "0.75rem",
    timeTag: "0.8rem",
    topMenu: "1.2rem",
    content: "1.2rem",
  },
  fontFamily: {
    sf: "sfMedium",
  },
  fullImage: {
    height: "630px",
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
    text-transform: capitalize;
  }
  li, ol, ul {
    margin: 0;
    border: 0;
    vertical-align: baseline;
    } 
  }
  a{
    text-decoration: none;
    color: ${(props) => props.theme.colors.white};
  }
`;

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalFonts />
    {children}
  </ThemeProvider>
);

export default Theme;
