import styled from "styled-components";

const size = {
  xs: "375px",
  sm: "540px",
  md: "720px",
  lg: "960px",
  xl: "1140px",
};

const device = {
  xs: `(min-width: ${size.xs})`,
  sm: `(min-width: ${size.sm})`,
  md: `(min-width: ${size.md})`,
  lg: `(min-width: ${size.lg})`,
  xl: `(min-width: ${size.xl})`,
};

// const media = {
//   xs: (styles) => `
//     @media only screen and ${device.xs}{
//         ${styles}
//     }
//     `,
// };

// function getWidth(w) {
//   if (!w) return;
//   let width = (w / 12) * 100;
//   return `width: ${width}%; flex: 0 0 ${width};`;
// }

export const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media ${device.xs} {
    max-width: 100%;
  }
  @media ${device.sm} {
    max-width: 576px;
  }
  @media ${device.md} {
    max-width: 768px;
  }
  @media ${device.lg} {
    max-width: 960px;
  }

  @media ${device.xl} {
    max-width: 1140px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

export const Col = styled.div`
  flex-basis: 0;
  flex: 1;
  flex-grow: 1;
  position: relative;
  padding-right: 15px;
  padding-left: 15px;
`;

export const Button = styled.button`
  display: inline-block;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.red};
  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  display: block;
  min-width: 11.25rem;
  height: 2.5rem;
  line-height: 2.5rem;
  padding: 0 1rem;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  outline: none;
  appearance: none;
  transition: ease-in-out 0.2s;
  & :hover {
    background-color: ${(props) => props.theme.colors.darkRed};
  }
  &:focus {
    outline: none;
  }
`;
