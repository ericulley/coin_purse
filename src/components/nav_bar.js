import React from 'react'
import {Link} from 'react-router-dom'

class NavBar extends React.Component {
    render = () => {
        return (
            <div id="navbar">
                <div id="left-nav">
                    <Link to={`/`}>
                        <p className="logo">Coin Purse</p>
                    </Link>
                    <Link to={'/market'}>
                        <h6>Market</h6>
                    </Link>
                    <Link to={'/portfolio'}>
                        <h6>Portfolio</h6>
                    </Link>
                </div>
                <div id="right-nav">
                    <Link to={`/login`}>
                        <p>Log In</p>
                    </Link>
                    <Link to={`/signup`}>
                        <button>Get Started</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default NavBar
