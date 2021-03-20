import React from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_NOMICS_API_KEY

class Market extends React.Component {
    state = {
        symbol: '',
        loading: false
    }
    searchBySymbol = (event) => {
        event.preventDefault()
        axios.get('http://localhost:3000/cryptocurrency/info?id=1').then((res) => {
            console.log(res)
            this.setState({
                symbol: ''
            })
        })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }
    componentWillMount = () => {
        axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${API_KEY}&sort=rank&per-page=10`)
            .then((res) => {
                console.log(res.data)
            })
    }
    render = () => {
        if (this.state.loading) {
            return <div id="loading">Loading...</div>
        } else {
            return (
                <div id="market-cont">
                    <h1>Welcome to the Market</h1>
                    <h2>More Features Coming Soon...</h2>


                </div>
            )
        }
    }
}

export default Market
