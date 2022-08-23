import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color:#0a0908;
    color:#f2f4f3;
    font-family:Roboto, sans-serif;
    -webkit-user-select:none;
    -moz-user-select:none; 
    -ms-user-select:none; 
    user-select:none

  }
`;

export const theme = {
  fonts: {
    title: "Luxurious Roman, cursive",
    banner: "Monoton, cursive",
    enText: "Roboto, sans-serif",
    krText: "Noto Sans KR, sans-serif",
    krText2: "Gaegu, cursive",
  },
  fontSizes: {
    small: "1rem",
    medium: "2rem",
    large: "3rem",
    xlarge: "4rem",
    x1large: "5rem",
    x2large: "6rem",
    x3large: "7rem",
    x4large: "8rem",
  },
  shadow: {
    lightShadow: "0px 0px 20px #ffffff",
    darkShadow: "4px 10px 5px 0px rgba(0, 0, 0, 0.5)",
    textShadow: "0px 0px 12px #ffffff",
  },
  colors: {
    greyColor: "#22333b",
    darkGreyColor: "#727272ad",
    lightColor: "#eae0d5",
  },
};
