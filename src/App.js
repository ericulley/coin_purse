// Dependencies
import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// Components
import Home from './pages/home.js'
import NavBar from './components/nav_bar.js'
import SignUp from './pages/signup.js'
import LogIn from './pages/login.js'
import LogOut from './pages/logout.js'
import Profile from './pages/profile.js'
import Portfolio from './pages/portfolio.js'
import Market from './pages/market.js'
import Show from './pages/show.js'
import MarketShow from './pages/market_show.js'
import Footer from './components/footer.js'

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
            userID: authUser.client,
            userName: authUser.userName,
            userEmail: authUser.email,
            authorized: authUser.authorized,
        })
    }
    logOut = () => {
        this.setState({
            userID: null,
            userName: '',
            userEmail: '',
            authorized: false,
            walletID: null,
        })
    }
    render = () => {
        return (
            <Router>
                <div className="App">
                <div id="wrapper">
                    <NavBar parentState={this.state}/>
                    <Switch>
                        <Route path='/' exact render={props => <Home parentState={this.state}/>} />

                        <Route path='/signup' component={SignUp} />

                        <Route path='/login' exact render={(props) => this.state.authorized ? <Redirect to='/portfolio'/> : <LogIn {...props} getUserData={this.getUserData}/>} />

                        <Route path='/logout' exact render={props => <LogOut logOut={this.logOut} parentState={this.state}/>} />

                        <Route path='/profile' render={(props) => this.state.authorized ? <Profile parentState={this.state} logOut={this.logOut}/> : <Redirect to='/'/>} />

                        <Route path='/market' render={props => this.state.authorized ?
                            <Market {...props} parentState={this.state}/> : <Redirect to="/signup" />} />

                        <Route path='/portfolio' render={props => this.state.authorized ?
                            <Portfolio {...props} parentState={this.state} setWalletID={this.setWalletID}/> : <Redirect to="/signup" />} />

                        <Route path='/show/:id' exact render={props =>
                            <Show {...props} parentState={this.state}/>}
                            />

                        <Route path='/market-show/:id' exact render={props =>
                            <MarketShow {...props} parentState={this.state}/>}
                            />    

                    </Switch>
                    </div>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;
