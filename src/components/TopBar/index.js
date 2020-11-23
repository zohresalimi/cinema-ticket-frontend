import React from "react";
import { useTranslation } from "react-i18next";
import DropDown from "../DropDown";
import { Wrapper, TopMenuContainer, Link, Logo, Ul, Li, Div } from "./style";
import { Container, Row, Col } from "../../Styles/StyleComponents";

function TopBar() {
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
                </Ul>
              </Div>
            </Col>
            <Col>
              <DropDown />
            </Col>
          </Row>
        </Container>
      </TopMenuContainer>
    </Wrapper>
  );
}

export default TopBar;
