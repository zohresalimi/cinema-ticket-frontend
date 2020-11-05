import React from "react";
import { Wrapper, TopMenuContainer, Link, Logo, Ul, Li, Div } from "./style";
import { Container, Row, Col } from "../../Styles/StyleComponents";

function TopBar(props) {
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
                  ></Logo>
                </Link>
                <Ul>
                  <Li>
                    <Link weight="bold">Home</Link>
                  </Li>
                  <Li>
                    <Link weight="bold">Movies</Link>
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
