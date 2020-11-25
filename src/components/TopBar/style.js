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

export const Wrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
`;

export const Link = styled.a`
  cursor: pointer;
  font-weight: ${(props) => props.weight};
  height: 100%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.topMenu};

  @media only screen and (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;
export const Logo = styled.img`
  display: block;
  max-width: 100%;
  height: 4rem;
  @media only screen and (min-width: 375px) {
    height: 3.5rem;
  }
`;

export const Ul = styled.ul`
  display: flex;
  height: 100%;
  list-style: none;
  padding: 0;
  display: none;

  @media only screen and (min-width: 768px) {
    display: flex;
  }
`;

export const Li = styled.li`
  margin: 0 4px;
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  &:hover {
    border-bottom: 2px solid #fff;
  }
`;
