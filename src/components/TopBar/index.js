import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import DropDown from "../DropDown";
import HamburgerMenu from "../HamburgerMenu";
import { Wrapper, TopMenuContainer, Link, Logo, Ul, Li, Div } from "./style";
import { Container, Row, Col } from "../../Styles/StyleComponents";

function TopBar() {
  const [isMenuOpen, setMenuState] = useState(false);
  const node = useRef();
  const { t } = useTranslation();

  return (
    <Wrapper>
      <TopMenuContainer>
        <Container>
          <Row>
            <Col>
              <Div>
                <div ref={node}>
                  <HamburgerMenu
                    isOpen={isMenuOpen}
                    toggleMenu={setMenuState}
                  />
                </div>
                <Link href="/">
                  <Logo
                    alt=""
                    src="https://www.filmstaden.se/contentassets/abcfcecd76ac47a18718257ddc52e804/filmstadenloggo100ar.png"
                  />
                </Link>
                <Ul>
                  <Li>
                    <Link href="/" data-testid="home-item" weight="bold">
                      {t("home")}
                    </Link>
                  </Li>
                </Ul>
              </Div>
            </Col>
            <Col>
              <div className="searchBar">
                <Link href="/search" weight="bold" data-testid="serach-icon">
                  <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                </Link>
                <DropDown />
              </div>
            </Col>
          </Row>
        </Container>
      </TopMenuContainer>
    </Wrapper>
  );
}

export default TopBar;
