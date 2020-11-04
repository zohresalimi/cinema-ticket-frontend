import React from "react";
import Theme from "./Styles/Theme";
import HomePage from "./pages/HomePage";
import "./Styles/globalStyle.css";

function App() {
  return (
    <Theme>
      <div className="App">
        <HomePage></HomePage>
      </div>
    </Theme>
  );
}

export default App;
