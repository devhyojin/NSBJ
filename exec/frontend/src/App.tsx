import React from 'react';
import { Route } from "react-router-dom";
import LandingPage from "./routes/LandingPage"
import MainPage from "./routes/MainPage"


function App() {
  return (
    <div>
      <Route path="/" exact component={LandingPage} />
      <Route path="/main" component={MainPage} />
    </div>
  );
}

export default App;