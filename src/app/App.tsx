import React from "react";
import ROUTES, { RenderRoutes } from "../routes/routes";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "../redux";
import Popup from "../components/generic/Popup";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <RenderRoutes routes={ROUTES} />
      </Router>
      <Popup />
    </Provider>
  );
}

export default App;
