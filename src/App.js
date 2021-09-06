import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './assets/logo.png'
import ChartsPage from './pages/ChartsPage'
import HomePage from './pages/HomePage'
import './App.css'


function App() {
  return (
    <div className="container">
      <Router>
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </Link>
        <Switch>
          <Route path="/cryptocurrency/:id" component={ChartsPage} />
          <Route to="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;

