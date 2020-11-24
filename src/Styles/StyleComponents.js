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
  box-sizing: border-box;

  @media ${device.xs} {
    max-width: 100%;
  }

  @media (min-width: 576px) {
    max-width: 540px;
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) {
    max-width: 720px;
  }

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

export const Col = styled.div`
  flex-basis: 0;
  flex: 1;
  flex-grow: 1;
  position: relative;
  box-sizing: border-box;
`;

export const Button = styled.button`
  display: inline-block;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.red};
  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  display: block;
  line-height: 2.5rem;
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
  &:disabled {
    background-color: ${(props) => props.theme.colors.lightGray};
    cursor: default;
    color: ${(props) => props.theme.colors.darkGray};
  }
  @media only screen and (max-width: 768px) {
    display: flex;
  }
`;

export const Breadcrumb = styled.h2`
  font-family: ${(props) => props.theme.fontFamily.sf};
  margin-top: 40px;
  font-size: ${(props) => props.theme.fontSizes.content};
  border-bottom: 1px solid ${(props) => props.theme.colors.red};
  justify-content: space-between;
  display: flex;
  a {
    color: ${(props) => props.theme.colors.red};
    font-size: ${(props) => props.theme.fontSizes.content};
    text-transform: capitalize;
    transition: all 0.4s ease;
    & :hover {
      color: ${(props) => props.theme.colors.white};
    }
  }
`;

export const Alert = styled.div`
  width: 100%;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  font-size: 1rem;
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  margin-top: 1rem;
  text-transform: capitalize;
`;

export const Input = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  margin: 10px 0;
  .input-group {
    display: flex;
    .input-group-text {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      display: flex;
      align-items: center;
      padding: 0.375rem 0.75rem;
      margin-bottom: 0;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #495057;
      text-align: center;
      white-space: nowrap;
      background-color: #e9ecef;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0
    }
  }
  input{
    flex: 1 1 auto;
    margin-bottom: 0;
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    text-indent: 40px;
}
  }
`;
