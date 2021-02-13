import React from 'react'
import axios from 'axios'

class Home extends React.Component {
    state = {
        name: '',
        symbol: '',
        purchasePrice: null,
        purchaseAmount: null,
        currentPrice: null,
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.type === 'number' ? event.target.value - 0 : event.target.value,
        })
    }
    createNewCoin = (event) => {
        event.preventDefault()
        axios.post('/coins', this.state).then((res) => {
            console.log(res)
        })
        document.getElementById('new-coin-form').reset()
    }
    render = () => {
        return (
            <React.Fragment>
                <h1>Welcome to Coin Purse</h1>
                <h2>enter your coin data below to add to you portfolio</h2>
                <form id="new-coin-form" onSubmit={this.createNewCoin}>
                    <label htmlFor="name">Coin Name</label>
                    <input id="name" type="text" onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="symbol">Coin Symbol</label>
                    <input id="symbol" type="text" onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="purchasePrice">Purchase Price</label>
                    <input id="purchasePrice" type="number" step="0.00001" onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="purchaseAmount">Purchase Amount</label>
                    <input id="purchaseAmount" type="number" step="0.00001" onChange={this.handleChange}/>
                    <br/>
                    <label htmlFor="currentPrice">Current Price</label>
                    <input id="currentPrice" type="number" step="0.00001" onChange={this.handleChange}/>
                    <br/>
                    <input type="submit" value="Add To Portfolio" />
                </form>
            </React.Fragment>
        )
    }
}

export default Home
