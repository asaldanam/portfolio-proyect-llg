import Router from "core/router";
import SessionManager from "core/session-manager";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <SessionManager>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </SessionManager>
  );
}

export default App;
