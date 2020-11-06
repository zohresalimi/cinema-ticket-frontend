import React from "react";
import { Wrapper, TopMenuContainer, Link, Logo, Ul, Li, Div } from "./style";
import { Container, Row, Col } from "../../Styles/StyleComponents";

function TopBar() {
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
                      Home
                    </Link>
                  </Li>
                  <Li>
                    <Link href="/" weight="bold">
                      Movies
                    </Link>
                  </Li>
                </Ul>
              </Div>
            </Col>
          </Row>
        </Container>
      </TopMenuContainer>
    </Wrapper>
  );
}

export default TopBar;
