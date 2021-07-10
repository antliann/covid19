import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';

import {Global, Country, About} from "./pages";
import {NavigationBar} from "./components";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/country">
          <Country/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/">
          <Global/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
