import React from 'react'
import axios from 'axios'

class Market extends React.Component {
    state = {
        symbol: '',
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
    componentDidMount = () => {

    }
    render = () => {
        return (
            <div id="market-cont">
                <h1>Welcome to the Market</h1>
                <h2>Enter a Coin Symbol below:</h2>
                <br/>
                <form action="/search" method="GET">
                    <input id="symbol" type="text" onChange={this.handleChange} name="symbol"/>
                    <input type="button" value="search" />
                </form>
            </div>
        )
    }
}

export default Market
