// Dependencies
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Components
import Home from './pages/home.js'
import NavBar from './components/nav_bar.js'
import SignUp from './client_test_form.js'


// React App (Parent Component)
function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/signup' component={SignUp} />

                </Switch>
            </div>
        </Router>
    );
}

export default App;
