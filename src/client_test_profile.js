import React from 'react'
import axios from 'axios'

class Profile extends React.Component {
    state = {
        firstName: '',
        email: '',
        clients: []
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

    getClients = () => {
        axios.get('/clients').then(
            (res) => {
                this.setState({
                    clients: res.data
                })
            }
        )
    }
    updateClient = (event) => {
        event.preventDefault()
        const id = event.target.getAttribute('id');
        axios.put(
            '/clients/' + id,
            {
                firstName: this.state.firstName,
                email: this.state.email,
            }
        ).then(
            (res) => {
                this.setState({
                    firstName: '',
                    email: '',
                    people: res.data,
                })
            }
        )
        this.getClients()
        document.getElementById(id).reset()
    }
    deleteClient = (event) => {
        axios.delete('/clients/' + event.target.value).then(
            (res) => {
                this.setState({
                    clients: res.data
                })
            }
        )
        this.getClients()
    }
    componentDidMount = () => {
        this.getClients()
    }
    render = () => {
        return (
            <div id="profile-cont">
                <h2>Client List</h2>
                <ul>
                    {this.state.clients.map(
                        (client, index) => {
                            return <li key={index}>

                                {client.firstName}: {client.email}

                                <button value={client.id} onClick={this.deleteClient}>DELETE</button>

                                <form id={client.id} onSubmit={this.updateClient}>
                                    <input id="firstName" onKeyUp={this.handleChange} type="text" placeholder="name"/>
                                    <br/>
                                    <input id="email" onKeyUp={this.handleChange} type="text" placeholder="email"/>
                                    <br/>
                                    <input type="submit" value="Update Client"/>
                                </form>
                            </li>
                        }
                    )}
                </ul>


            </div>
        )
    }
}

export default Profile
