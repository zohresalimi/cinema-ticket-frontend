import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  font-family: "sfMedium";
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  &:hover: {
    box-shadow: inset 0 -0.25rem 0 0 #cc0028;
  }
`;

export const TopMenuContainer = styled.div`
  font-family: "sfMedium";
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  background-color: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.white};
`;

export const Wrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
`;
