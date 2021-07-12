import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';

import {Global, Country, About} from './pages';
import {NavigationBar} from "./components";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path={process.env.PUBLIC_URL + '/country'}>
          <Country/>
        </Route>
        <Route path={process.env.PUBLIC_URL + '/about'}>
          <About/>
        </Route>
        <Route path={process.env.PUBLIC_URL + '/'}>
          <Global/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
