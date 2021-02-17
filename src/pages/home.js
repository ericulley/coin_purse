import React from 'react'
import {Link} from 'react-router-dom'

class Home extends React.Component {
    state = {
        name: '',
        symbol: '',
        purchasePrice: null,
        purchaseAmount: null,
        currentPrice: null,
    }
    render = () => {
        let directTo
        if (this.props.parentState.authorized) {
            directTo = '/portfolio'
        } else {
            directTo = '/signup'
        }

        return (
            <React.Fragment>
                <h1 id="logo-header">Welcome to</h1>
                <img id="welcome-logo" src="/logos/LOGO.svg" alt="coinpurse-logo"/>
                <br/>
                <Link to={directTo}>
                    <button className="get-started">Get Started</button>
                </Link>

            </React.Fragment>
        )
    }
}

export default Home
