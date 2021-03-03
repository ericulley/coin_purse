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
        axios.post('https://mysterious-atoll-88793.herokuapp.com/clients',
            {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            })
            .then((res) => {

            })
            .catch((err) => {
                console.log(err.response.data)
                alert(`Error Status: ${err.response.data.status}: ${err.response.data.error}: ${err.response.data.message}`)
            })
        document.getElementById('sign-up-form').reset()
        this.props.history.push('/login', {email: this.state.email})
    }
    getUsers = () => {
        axios.get('https://mysterious-atoll-88793.herokuapp.com/clients')
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
                <img className="logo" src="/logos/ICON.svg" alt="coinpurse-logo"/>
                <h2>Sign Up</h2>
                <form id="sign-up-form" onSubmit={this.createUser}>
                    <label htmlFor="name">First Name</label>
                    <input id="name" onKeyUp={this.handleChange} type="text" />
                    <label htmlFor="email">Email</label>
                    <input id="email" onKeyUp={this.handleChange} type="text" />
                    <label htmlFor="password">Password</label>
                    <input id="password" onKeyUp={this.handleChange} type="password" />
                    <input id="sign-up-submit" type="submit" value="Create New User"/>
                </form>
            </div>
        )
    }
}

export default SignUp
