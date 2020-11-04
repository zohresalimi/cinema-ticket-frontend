import React from "react";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";

import sfMedium from "./fonts/sf-compact-medium.woff";
import sfThin from "./fonts/sf-compact-thin.woff";

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
  }
`;

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalFonts />
    {children}
  </ThemeProvider>
);

export default Theme;
