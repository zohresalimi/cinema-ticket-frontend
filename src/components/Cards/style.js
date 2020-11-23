import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  font-family: ${(props) => props.theme.fontFamily.sf};
  color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  overflow: hidden;
  transition: all 0.4s ease;
  position: relative;
  .imageWrapper {
    position: relative;
    border-radius: 0.25rem;
    transition: all 0.4s ease;
    overflow: hidden;

    &:hover {
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 0.3);
        z-index: 9;
      }
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background-color: ${(props) => props.theme.colors.red};
        transition: all 0.15s ease-in-out;
      }
    }
    .time-wrapper {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: ${(props) => props.theme.colors.red};
      color: ${(props) => props.theme.colors.white};
      padding: 5px;
      font-size: ${(props) => props.theme.fontSizes.timeTag};
      text-align: center;
      z-index: 9;
    }
  }

  h5 {
    margin-top: 0.9rem;
    padding: 0 5px;
    font-size: ${(props) => props.theme.fontSizes.small};
    line-height: 0.875rem;
    min-height: 1.75rem;
    opacity: 0.7;
    white-space: normal;
    max-height: 1.75rem;
    overflow: hidden;
    text-transform: capitalize;
  }
`;

export const TopMenuContainer = styled.div`
  font-family: ${(props) => props.theme.fontFamily.sf};
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
