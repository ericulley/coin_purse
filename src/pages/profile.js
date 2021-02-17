import React from 'react'
import axios from 'axios'

// New User Sign Up
class Profile extends React.Component {
    state = {
        clients: []
    }
    getClients = () => {
        axios.get('https://mysterious-atoll-88793.herokuapp.com/clients').then((res) => {
            this.setState({
                clients: res.data
            })
            console.log(res.data)
        })
    }
    deleteClient = (event) => {
        axios.delete('https://mysterious-atoll-88793.herokuapp.com/clients/' + event.target.id).then((res) => {
            this.setState({
                clients: res.data
            })
        })
    }
    componentDidMount = () => {
        this.getClients()
    }
    render = () => {
        return (
            <div>
                <h1>Profiles</h1>
                {this.state.clients.map((client) => {
                    return (
                        <div key={client.id}>
                            <p>{client.name}</p>
                            <p>{client.email}</p>
                            <button id={client.id} onClick={this.deleteClient}>Delete</button>
                        </div>
                    )
                })}

            </div>
        )
    }
}

export default Profile
