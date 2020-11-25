import styled from "styled-components";

export const Div = styled.div`
  flex-direction: row;
  justify-content: inherit;
  align-items: center;
  display: flex;
  height: 100%;
`;

export const TopMenuContainer = styled.div`
  font-family: ${(props) => props.theme.fontFamily.sf};
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  background-color: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.white};
  .searchBar {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    display: flex;
    .searchIcon {
    }
  }
`;

export const SearchInput = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin-top: 20px;
  svg{
      position: absolute;
      top: 34%;
    left: 13px;
    &.spiner{
      position: absolute;
      top: 34%;
    left: auto;
    right: 50px;
  }
  }

  input {
    width: 95%;
    border-radius: 1.5rem;
    padding: 10px;
    background-color: ${(props) => props.theme.colors.black};
    border: 1px solid #fff;
    font-family: ${(props) => props.theme.fontFamily.sf};
    font-size: ${(props) => props.theme.fontSizes.content};
    color: ${(props) => props.theme.colors.white};
    text-indent: 40px;
    ::-webkit-input-placeholder {
      color: color: ${(props) => props.theme.colors.lightGray};
    }
    :-moz-placeholder {
      color: color: ${(props) => props.theme.colors.lightGray};
      opacity: 1;
    }
    ::-moz-placeholder {
      color: color: ${(props) => props.theme.colors.lightGray};
      opacity: 1;
    }
    :-ms-input-placeholder {
      color: color: ${(props) => props.theme.colors.lightGray};
    }
    ::-ms-input-placeholder {
      color: color: ${(props) => props.theme.colors.lightGray};
    }

    ::placeholder {
      color: color: ${(props) => props.theme.colors.lightGray};
    }
    &:focus {
    outline: none !important;
    border:1px solid red;
    border-radius: 1.5rem;
    box-shadow: 0 0 10px #719ECE;
}
  }
`;
