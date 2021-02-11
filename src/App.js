// Dependencies
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Components
import Home from './pages/home.js'
import NavBar from './components/nav_bar.js'
import SignUp from './client_test_form.js'
import Market from './pages/market.js'
import Portfolio from './pages/portfolio.js'


// React App (Parent Component)
function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/market' component={Market} />
                    <Route path='/portfolio' component={Portfolio} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
