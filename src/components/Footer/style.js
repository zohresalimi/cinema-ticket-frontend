import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #1b1b1b;
  display: flex;
  padding: 20px 0;
  justify-content: center;
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
  justify-content: flex-end;
  height: 100%;
  list-style: none;
  padding: 0;

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
