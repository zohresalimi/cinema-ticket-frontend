import React, { useReducer } from "react";
import { Router, Link } from "@reach/router";
import Theme from "./Styles/Theme";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import AppContext from "./store/context";
import store from "./store";

import "./Styles/globalStyle.css";

function App() {
  const [state, dispatch] = useReducer(store.reducer, store.initialState);
  return (
    <Theme>
      <div className="App">
        <AppContext.Provider value={{ state, dispatch }}>
          <Router>
            <HomePage path="/" />
            <MovieDetailPage path=":category/movie-detail/:movieId" />
          </Router>
        </AppContext.Provider>
      </div>
    </Theme>
  );
}

export default App;
