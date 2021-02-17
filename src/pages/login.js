import React from 'react'
import axios from 'axios'

// New User Sign Up
class LogIn extends React.Component {
    state = {
        email: '',
        password: '',
        sessions: []
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }
    newSession = (event) => {
        event.preventDefault();
        axios.post('https://mysterious-atoll-88793.herokuapp.com/sessions', this.state)
            .then((res) => {
                this.setState({
                    email: '',
                    password: '',
                    sessions: res.data
                })
                console.log(res.data)
                this.props.getUserData(res.data)
            }
        )
        document.getElementById('login-form').reset()
    }
    render = () => {
        return (
            <div id="login-cont">
            <h2>Log In</h2>
            <form id="login-form" onSubmit={this.newSession}>
                <label htmlFor="email">Email:</label>
                <input id="email" onKeyUp={this.handleChange} type="text" />
                <br/>
                <label htmlFor="password">Password:</label>
                <input id="password" onKeyUp={this.handleChange} type="password" />
                <br/>
                <input type="submit" value="Log In"/>
            </form>
            </div>
        )
    }
}

export default LogIn
