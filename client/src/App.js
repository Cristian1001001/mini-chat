import React from 'react';
import 'materialize-css';
import {BrowserRouter as Router} from 'react-router-dom';
import {UseRoutes} from "./routes";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import NavBar from "./components/navBar";

function App() {
  return (
      <Provider store={store}>
        <Router>
            <NavBar/>
            <UseRoutes/>
        </Router>
      </Provider>
  );
}

export default App;
