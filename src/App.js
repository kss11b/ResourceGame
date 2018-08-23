import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {Row, Col, Card, CardTitle, Button, Navbar, NavItem} from 'react-materialize'
import Clock from './secondCounter.js'
// import SportsNews from './sportsNews.js'
// import BusinessNews from './businessNews.js'
// import ScienceNews from './scienceNews.js'
// import PoliticalNews from './politicalNews.js'
// import EntertainmentNews from './entertainmentNews.js'
import AppBar from '@material-ui/core/AppBar';
import './App.css';


const Home = () =>
  <h1>
    Home
  </h1>



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Navbar className='blue darken-1'>
              <NavItem>
                <Link to="/">
                Home
                </Link>
              </NavItem>
              {/* <NavItem>
                <Link to="/sports">
                  Sports News
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/business">
                  Business News
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/science">
                  Science News
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/political">
                  Political News
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/entertainment">
                  Entertainment News
                </Link>
              </NavItem> */}
            </Navbar>
            <Route exact path="/" component={Clock}/>
            {/* <Route exact path="/tech" component={TechNews}/>
            <Route exact path="/sports" component={SportsNews}/>
            <Route exact path="/business" component={BusinessNews}/>
            <Route exact path="/science" component={ScienceNews}/>
            <Route exact path="/political" component={PoliticalNews}/>
            <Route exact path="/entertainment" component={EntertainmentNews}/> */}

        </div>
      </Router>
    );
  }
}

export default App;
