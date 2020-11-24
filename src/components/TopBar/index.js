import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import DropDown from "../DropDown";
import HamburgerMenu from "../HamburgerMenu";
import { Wrapper, TopMenuContainer, Link, Logo, Ul, Li, Div } from "./style";
import { Container, Row, Col } from "../../Styles/StyleComponents";

function TopBar() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Wrapper>
      <TopMenuContainer>
        <Container>
          <Row>
            <Col>
              <Div>
                <div ref={node}>
                  <HamburgerMenu open={open} setOpen={setOpen} />
                </div>
                <Link href="/">
                  <Logo
                    alt=""
                    src="https://www.filmstaden.se/contentassets/abcfcecd76ac47a18718257ddc52e804/filmstadenloggo100ar.png"
                  />
                </Link>
                <Ul>
                  <Li>
                    <Link href="/" weight="bold">
                      {t("home")}
                    </Link>
                  </Li>
                  <Li>
                    <Link href="/" weight="bold">
                      {t("movies")}
                    </Link>
                  </Li>
                  <Li>
                    <Link href="/sign-up" weight="bold">
                      {t("sign up")}
                    </Link>
                  </Li>
                </Ul>
              </Div>
            </Col>
            <Col>
              <div className="searchBar">
                <FontAwesomeIcon icon={faSearch} className="searchIcon" />
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
