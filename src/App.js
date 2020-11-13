import React, { useReducer, useEffect } from "react";
import { Router } from "@reach/router";
import Theme from "./Styles/Theme";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import Booking from "./pages/Booking";
import QuantityPage from "./pages/QuantityPage";
import SeatPage from "./pages/SeatPage";
import AppContext from "./store/context";
import store from "./store";
import { setLocalStorage, getLocalStorage } from "./utils/localStorage";
import "./Styles/globalStyle.css";

const cachedState = getLocalStorage(store.initialState);
function App() {
  const [state, dispatch] = useReducer(store.reducer, cachedState);

  useEffect(() => {
    setLocalStorage(state);
  }, [state]);

  return (
    <Theme>
      <div className="App">
        <AppContext.Provider value={{ state, dispatch }}>
          <Router>
            <HomePage path="/" />
            <MovieDetailPage path=":category/movie-detail/:movieId" />
            <Booking path="booking/:showingId">
              <QuantityPage path="/" />
              <SeatPage path="seat-selection" />
            </Booking>
          </Router>
        </AppContext.Provider>
      </div>
    </Theme>
  );
}

export default App;
