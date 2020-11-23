import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: ${({ open }) => (open ? "2rem" : "1.5rem")};
  width: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 99;
  display: flex;
  position: relative;

  &:focus {
    outline: none;
  }

  div {
    width: ${({ open }) => (open ? "2rem" : "1.5rem")};
    height: 0.2rem;
    background: ${({ open }) => (open ? "#0D0C1D" : "#FFF")};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${(props) => props.theme.colors.white};
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: 100vh;
  text-align: left;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 9;

  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${(props) => props.theme.colors.black};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }
`;
function HamburgerMenu({ open, setOpen }) {
  const { t } = useTranslation();

  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      <StyledMenu open={open}>
        <a href="/">{t("home")}</a>
        <a href="/">{t("movies")}</a>
      </StyledMenu>
    </>
  );
}

export default HamburgerMenu;

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};
