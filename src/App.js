// Dependencies
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Components
import Home from './pages/home.js'
import NavBar from './components/nav_bar.js'
import UnAuthUser from './components/unauth_user.js'
import SignUp from './pages/signup.js'
import LogIn from './pages/login.js'
import Profile from './pages/profile.js'
import Portfolio from './pages/portfolio.js'


// React App (Parent Component)
class App extends React.Component {
    state = {
        userID: null,
        userName: '',
        userEmail: '',
        authorized: false,
    }
    getUserData = (authUser) => {
        console.log(authUser)
        this.setState({
            userID: authUser.clientId,
            userName: authUser.userName,
            userEmail: authUser.email,
            authorized: authUser.authorized,
        })
    }
    render = () => {
        return (
            <Router>
                <div className="App">
                    <NavBar parentState={this.state}/>
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/signup' component={SignUp} />
                        <Route path='/login' render={props => <LogIn {...props} getUserData={this.getUserData}/> }/>
                        <Route path='/profile' component={Profile} />
                        <Route path='/portfolio' render={props =>
                            this.state.authorized ?
                            <Portfolio {...props} parentState={this.state}/> : <UnAuthUser/>
                            }
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
