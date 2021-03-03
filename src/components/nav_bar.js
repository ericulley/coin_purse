import React from 'react'
import {NavLink} from 'react-router-dom'

class NavBar extends React.Component {
    render = () => {
        let controls
        if (this.props.parentState.authorized) {
            controls = <React.Fragment>
                <NavLink to={`/profile`}>
                    <h2>Profile</h2>
                </NavLink>
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
                    <button><p>Get Started</p></button>
                </NavLink>
            </React.Fragment>
        }
        return (
            <div id="navbar">
                <div id="left-nav">
                    <NavLink to={`/`}>
                        <div id="nav-logo-cont">
                            <img src="/logos/ICON.svg" alt="cp_logo"/>
                        </div>
                    </NavLink>
                    <NavLink to={'/market'}>
                        <h2>Market</h2>
                    </NavLink>
                    <NavLink to={'/portfolio'}>
                        <h2>Portfolio</h2>
                    </NavLink>
                </div>
                <div id="right-nav">
                    {controls}
                </div>
            </div>
        )
    }
}

export default NavBar
