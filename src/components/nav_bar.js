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
                    <h6>Market</h6>
                    <h6>Portfolio</h6>
                </div>
                <div id="right-nav">
                    <p>Log In</p>
                    <Link to={`/signup`}>
                        <button>Get Started</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default NavBar
