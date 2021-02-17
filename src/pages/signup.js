import React from 'react'
import axios from 'axios'

// New User Sign Up
class SignUp extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        bio: '',
        users: []
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }
    createUser = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/clients',
            {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            })
            .then((res) => {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    bio: '',
                    users: res.data
                })
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err.response.data)
                alert(`Error Status: ${err.response.data.status}: ${err.response.data.error}: ${err.response.data.message}`)
            })
        document.getElementById('sign-up-form').reset()
    }
    getUsers = () => {
        axios.get('http://localhost:8080/clients')
            .then((res) => {
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
                <label htmlFor="name">First Name:</label>
                <input id="name" onKeyUp={this.handleChange} type="text" />
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
