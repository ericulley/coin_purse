import React from 'react'
import {NavLink} from 'react-router-dom'

class NavBar extends React.Component {
    render = () => {
        let controls
        if (this.props.parentState.authorized) {
            controls = <React.Fragment>
                <NavLink to={`/logout`}>
                    <h2>Log Out</h2>
                </NavLink>
            </React.Fragment>
        } else {
            controls = <React.Fragment>
                <NavLink to={`/login`}>
                    <h2>Log In</h2>
                </NavLink>
                <NavLink to={`/signup`}>
                    <button><h2>Get Started</h2></button>
                </NavLink>
            </React.Fragment>
        }
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
                        <h2>Portfolio</h2>
                    </NavLink>
                </div>
                <div id="right-nav">
                    <NavLink to={`/profile`}>
                        <h2>Profile</h2>
                    </NavLink>
                    {controls}

                </div>
            </div>
        )
    }
}

export default NavBar
