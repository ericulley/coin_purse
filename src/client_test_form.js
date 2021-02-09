import React from 'react'
import axios from 'axios'

// New User Sign Up
class SignUp extends React.Component {
    state = {
        firstName: '',
        email: '',
        password: '',
        users: []
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }
    createUser = (event) => {
        event.preventDefault();
        axios.post(
            '/clients',
            {
                firstName: this.state.firstName,
                email: this.state.email,
                password: this.state.password,
            }
        ).then(
            (res) => {
                console.log(res.data)
                this.setState({
                    users: res.data
                })
            }
        )
        document.getElementById('sign-up-form').reset()
    }
    getUsers = () => {
        axios.get('/clients').then(
            (res) => {
                this.setState({
                    users: res.data
                })
            }
        )
    }
    render = () => {
        return (
            <div id="sign-up-cont">
            <h2>Sign Up</h2>
            <form id="sign-up-form" onSubmit={this.createUser}>
                <label htmlFor="firstName">First Name:</label>
                <input id="firstName" onKeyUp={this.handleChange} type="text" />
                <br/>
                <label htmlFor="email">Email:</label>
                <input id="email" onKeyUp={this.handleChange} type="text" />
                <br/>
                <label htmlFor="password">Password:</label>
                <input id="password" onKeyUp={this.handleChange} type="password" />
                <br/>
                <input type="submit" value="Create New User"/>
            </form>
            </div>
        )
    }
}

export default SignUp
