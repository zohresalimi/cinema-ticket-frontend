import React from "react";
import { Wrapper, TopMenuContainer } from "./style";
import { Container, Row, Col } from "../../Styles/StyleComponents";

function TopBar(props) {
  return (
    <Wrapper>
      <TopMenuContainer>
        <Container>
          <Row>
            <Col> TopBar gy</Col>
          </Row>
        </Container>
      </TopMenuContainer>
    </Wrapper>
  );
}

export default TopBar;
