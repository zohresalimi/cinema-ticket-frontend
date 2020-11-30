/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { Link, useLocation, useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import Moment from "react-moment";
import { loadStripe } from "@stripe/stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faAngleLeft,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../hooks/useAxios";
import AppContext from "../../store/context";
import formatPrice from "../../utils/formatPrice";

import {
  Container,
  Row,
  Button,
  Breadcrumb,
  Alert,
  Input,
} from "../../Styles/StyleComponents";
import Wrapper from "./style";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

function ConfirmPage() {
  const { state } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const { state: locationState } = useLocation();
  const navigate = useNavigate();
  const { cinema, movie, price, quantity, seatNumbers, showing } = state.ticket;
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(null);
  const [checked, setChecked] = useState(false);
  const seatsArray = Array.from(seatNumbers).map((seat) => {
    return [seat[0], [...seat[1]].sort((a, b) => a - b)];
  });

  const [
    { error: ticketError, response: ticketResponse, loading: ticketLoading },
    createTicket,
  ] = useAxios("/api/v1/tickets", {
    manual: true,
    data: {
      email,
      quantity,
      seatNumbers: seatsArray,
      price,
      unitAmount: showing.price,
      movieName: movie.name,
      roomName: showing.room.name,
      cinemaName: cinema.name,
      showing: showing._id,
      movieCover: movie.coverImage,
    },
    method: "post",
  });

  const [
    { response: checkoutResponse, loading: checkoutInProgress },
    createCheckout,
  ] = useAxios("/api/v1/checkout/create", {
    manual: true,
    method: "post",
  });

  useEffect(() => {
    async function createSession() {
      if (ticketResponse && !checkoutInProgress && !checkoutResponse) {
        await createCheckout({
          data: {
            ticketId: ticketResponse.data._id,
          },
        });
      }
    }

    createSession();
  }, [checkoutInProgress, ticketResponse, checkoutResponse]);

  useEffect(() => {
    async function goToCheckout() {
      if (checkoutResponse) {
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({
          sessionId: checkoutResponse.id,
        });
        if (result.error) {
          navigate("order/cancel");
        }
      }
    }

    goToCheckout();
  }, [checkoutResponse]);

  const emailValidation = useCallback(() => {
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (pattern.test(email) === false && email) {
      setEmailError("please enter a valid email");
    } else setEmailError(null);
  }, [email]);

  const enableButton = useMemo(() => email && checked && !emailError, [
    email,
    checked,
    emailError,
  ]);

  return (
    <Container>
      <Row>
        <div className="full-width">
          <Breadcrumb>
            <Link
              to="../seat-selection"
              state={{ category: locationState.category }}
            >
              <FontAwesomeIcon icon={faAngleLeft} className="mr-10" />
              {t("seat selection")}
            </Link>
            <Link to="/">{t("sing in")}</Link>
          </Breadcrumb>
          <Wrapper>
            <h2>{t("reservation")}</h2>
            <div className="movie-info">
              <img src={movie.coverImage} alt="" />
              <div className="info">
                <h4>{t(movie.name)}</h4>
                <p>
                  <Moment
                    locale={i18n.language}
                    calendar={showing.startTime}
                    format="dddd D MMMM"
                    tz="Europe/Stockholm"
                  />
                </p>
                <p>
                  <Moment
                    locale={i18n.language}
                    date={showing.startTime}
                    format="HH:mm"
                    tz="Europe/Stockholm"
                  />
                </p>
                <p>{cinema.name}</p>
                <p>{t(showing.room.name)}</p>
                <div>
                  {seatsArray &&
                    seatsArray.map(([row, seats]) => (
                      <div key={`r${row}`}>
                        <span className="sub-title">{t("row")}</span>
                        <span>{row + 1}</span>
                        <span className="sub-title">{t("seat number")}</span>
                        <span>{row + 1}</span>
                        <span>{seats.map((seat) => seat + 1).join(", ")}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="row-box">
              <p>{`${quantity} ticket`}</p>
              <p>{formatPrice(showing.price)}</p>
            </div>
            <div className="row-box">
              <p>{t("to pay")}</p>
              <p>{formatPrice(price)}</p>
            </div>
            <div>
              <label>
                {t("your e-mail")}
                <Input>
                  <div className="input-group">
                    <div className="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                  </div>
                  <input
                    onInput={(e) => setEmail(e.target.value)}
                    onBlur={() => emailValidation()}
                    type="text"
                    name="name"
                    placeholder="example@gmail.com"
                  />
                </Input>
                {emailError && <Alert>{t(emailError)}</Alert>}
              </label>
            </div>
            <div>
              <label>
                <input
                  name="checkbox"
                  type="checkbox"
                  className="m-10"
                  onChange={() => setChecked(!checked)}
                />
                {t("i accept the  terms of purchase.")}
              </label>
            </div>
            <Button role="link" disabled={!enableButton} onClick={createTicket}>
              {ticketLoading && <FontAwesomeIcon icon={faSpinner} spin />}
              {t("continue")}
            </Button>
            {ticketError && <Alert>{t("try again")}</Alert>}
          </Wrapper>
        </div>
      </Row>
    </Container>
  );
}

export default ConfirmPage;
