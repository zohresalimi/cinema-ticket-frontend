import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: ${(props) => props.theme.fontFamily.sf};
  display: flex;
  align-items: center;
  width: 100%;
  color: ${(props) => props.theme.colors.black};
  .spiner-wraper {
    width: 100%;
    display: flex;
    justify-content: center;
    color: ${(props) => props.theme.colors.red};
    .spiner {
      font-size: 30px;
      margin: 30px 0;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0;
    width: 100%;
    .no-result-message {
      text-align: center;
      width: 100%;
    }
    li {
      width: 100%;
      border-bottom: 1px solid #ccc;
      a {
        color: ${(props) => props.theme.colors.black};
        display: flex;
        flex-direction: row;
        text-decoration: none;
        text-transform: capitalize;
        position: relative;
        padding-right: 10px;
        .image-wrapper {
          width: 80px;
          margin-right: 20px;
          img {
            width: 100%;
            height: auto;
          }
        }
        .right-side {
          position: absolute;
          right: 10px;
          top: 40%;
        }
        &:hover {
          background-color: ${(props) => props.theme.colors.lightGray};
        }
      }
    }
  }
`;

export const SearchInput = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin: 20px 0;
  svg{
    position: absolute;
    top: 34%;
    left: 13px;
    color: ${(props) => props.theme.colors.black};
  }

  input {
    width: 95%;
    border-radius: 1.5rem;
    padding: 10px;
    border: 1px solid #000;
    font-family: ${(props) => props.theme.fontFamily.sf};
    font-size: ${(props) => props.theme.fontSizes.content};
    color: ${(props) => props.theme.colors.black};
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
