import React, { useReducer, useEffect } from "react";
import { Router } from "@reach/router";
import { useTranslation } from "react-i18next";

import Theme from "./Styles/Theme";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import Booking from "./pages/Booking";
import QuantityPage from "./pages/QuantityPage";
import SeatPage from "./pages/SeatPage";
import ConfirmPage from "./pages/ConfirmPage";
import OrderPage from "./pages/OrderPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import SearchPage from "./pages/SearchPage";
import AppContext from "./store/context";
import Footer from "./components/Footer";
import store from "./store";
import { setLocalStorage, getLocalStorage } from "./utils/localStorage";
import "./Styles/globalStyle.css";

const cachedState = getLocalStorage(store.initialState);
function App() {
  const [state, dispatch] = useReducer(store.reducer, cachedState);
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();

  useEffect(() => {
    setLocalStorage(state);
  }, [state]);

  return (
    <Theme>
      <div className="App">
        <AppContext.Provider value={{ state, dispatch }}>
          <Router>
            <HomePage path="/" />
            <SearchPage path="search" />
            <MovieDetailPage path=":category/movie-detail/:movieId" />
            <Booking path="booking/:showingId">
              <QuantityPage path="/" />
              <SeatPage path="seat-selection" />
              <ConfirmPage path="confirm-booking" />
            </Booking>
            <OrderPage path="order">
              <SuccessPage path="success" />
              <CancelPage path="cancel" />
            </OrderPage>
          </Router>
        </AppContext.Provider>
        <Footer />
      </div>
    </Theme>
  );
}

export default App;
