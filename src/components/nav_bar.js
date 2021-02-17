import React from 'react'
import {NavLink} from 'react-router-dom'

class NavBar extends React.Component {
    render = () => {
        return (
            <div id="navbar">
                <div id="left-nav">
                    <NavLink to={`/`}>
                        <div id="nav-logo-cont">
                            <img src="/logos/ICON.svg" alt="cp_logo"/>
                            <h1 className="logo">COIN PURSE</h1>
                        </div>
                    </NavLink>
                    <NavLink to={'/portfolio'}>
                        <h6>Portfolio</h6>
                    </NavLink>
                </div>
                <div id="right-nav">
                    <NavLink to={`/profile`}>
                        <p>Profile</p>
                    </NavLink>
                    <NavLink to={`/login`}>
                        <p>Log In</p>
                    </NavLink>
                    <NavLink to={`/signup`}>
                        <button>Get Started</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default NavBar
