import React, { useReducer } from "react";
import Theme from "./Styles/Theme";
import HomePage from "./pages/HomePage";
import AppContext from "./store/context";
import store from "./store";

import "./Styles/globalStyle.css";

function App() {
  const [state, dispatch] = useReducer(store.reducer, store.initialState);
  return (
    <Theme>
      <div className="App">
        <AppContext.Provider value={{ state, dispatch }}>
          <HomePage></HomePage>
        </AppContext.Provider>
      </div>
    </Theme>
  );
}

export default App;
