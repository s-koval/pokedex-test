import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {
    Navbar
} from 'react-bootstrap';

import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import {useSelector} from "react-redux";

const App = () => {
  const isLoading = useSelector(state => !!state?.pokemon?.pending);
  return (
      <Router>
          <Navbar bg="light" expand="lg">
              <Link to={'/'}>
                  Home
              </Link>
          </Navbar>
          <Switch>
              <Route path="/:id">
                  <Pokemon />
              </Route>
              <Route path="/">
                  <Home />
              </Route>
          </Switch>
          {
              isLoading && <div style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'rgba(0,0,0, .6)',
                  color: '#FFF',
                  zIndex: 1000,
                  opacity: .7
              }}>Loading...</div>
          }
      </Router>
  );
}

export default App;
