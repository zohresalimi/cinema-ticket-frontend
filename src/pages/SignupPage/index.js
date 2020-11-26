import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import TopBar from "../../components/TopBar";
import { Container, Row, Col } from "../../Styles/StyleComponents";
import Wrapper from "./style";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [t] = useTranslation();

  const handleSubmit = (event) => {
    console.log(`
      Email: ${email}
      Password: ${password}
      Accepted Terms: ${acceptedTerms}
    `);

    event.preventDefault();
  };

  return (
    <div>
      <TopBar />
      <Wrapper>
        <Container>
          <Row>
            <Col>
              <div>
                <form onSubmit={handleSubmit}>
                  <h1>{t("create cccount")}</h1>

                  <label>
                    {t("email:")}
                    <input
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>

                  <label>
                    Password:
                    <input
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </label>

                  <label>
                    <input
                      name="acceptedTerms"
                      type="checkbox"
                      onChange={(e) => setAcceptedTerms(e.target.value)}
                      required
                    />
                    I accept the terms of service
                  </label>

                  <button>Submit</button>
                </form>
              </div>
            </Col>
            <Col>
              <div>
                <form onSubmit={handleSubmit}>
                  <h1>log in</h1>

                  <label>
                    Email:
                    <input
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>

                  <label>
                    Password:
                    <input
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </label>

                  <label>
                    <input
                      name="acceptedTerms"
                      type="checkbox"
                      onChange={(e) => setAcceptedTerms(e.target.value)}
                      required
                    />
                    I accept the terms of service
                  </label>

                  <button>Submit</button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </div>
  );
}

export default SignupPage;
