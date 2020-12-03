import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Wrapper, Logo, Ul, Li } from "./style";
import { Container, Row, Col } from "../../Styles/StyleComponents";

import logo from "../../images/logo.png";

function Footer() {
  return (
    <Wrapper>
      <Container>
        <Row>
          <Col>
            <Logo alt="" src={logo} />
          </Col>
          <Col>
            <Ul>
              <Li>
                <a href="https://www.facebook.com/">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </Li>
              <Li>
                <a href="https://www.instagram.com/">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </Li>
              <Li>
                <a href="https://www.twitter.com/">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </Li>
            </Ul>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

export default Footer;
