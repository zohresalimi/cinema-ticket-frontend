import styled from "styled-components";

export const Wrapper = styled.div`
  display: inline;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

export const MenuLabel = styled.ul`
  color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  z-index: 9;
  list-style: none;
  align-items: flex-end;
  text-align: center;
`;

export const ItemList = styled.li`
  font-family: ${(props) => props.theme.fontFamily.sf};
  padding: 0.25em 2em 0.25em 2em;
  width: 100%;
  color: ${(props) => props.theme.colors.black};
  background: white;
  line-height: 30px;
  padding: 0.25em 2em 0.25em 2em;
  cursor: defaul;
  border-bottom: 1px solid #eee;
  transition: all 0.25s ease;
  &:hover,
  &.selected {
    background: #f7f7f7;
    color: #4a4a4a;
  }
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  margin-left: 20px;
  font-size: 14px;
  justify-content: center;
  position: relative;
  font-size: 20px;
  color: ${(props) => props.theme.colors.white};
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  appearance: none;
  box-shadow: none;
  transition: ease-in-out 0.2s;
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 375px) {
    font-size: 13px;
  }
`;

export const CaratContainer = styled.div`
  transform: ${(props) => (props.isOpen ? "rotate(0deg)" : "rotate(180deg)")};
  transition: all 0.2s ease;
  width: 20px;
`;
