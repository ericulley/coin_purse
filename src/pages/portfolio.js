import React from 'react'
import axios from 'axios'

class Portfolio extends React.Component {
    state = {
        purchaseAmount: null,
        currentPrice: null,
        coins: []
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.type === 'number' ? event.target.value - 0 : event.target.value,
        })
    }
    getPortfolio = () => {
        axios.get('/coins').then(
            (res) => {
                this.setState({
                    coins: res.data
                })
            }
        )
    }
    updateCoin = (event) => {
        event.preventDefault()
        if (!this.state.purchaseAmount) {
            axios.put('/coins/' + event.target.id,
                {
                    currentPrice: this.state.currentPrice,
                })
                .then((res) => {
                    this.setState({
                        coins: res.data
                    })
                    this.getPortfolio()
                })
            document.getElementById(event.target.id).reset()
        } else if (!this.state.currentPrice) {
            axios.put('/coins/' + event.target.id,
                {
                    purchaseAmount: this.state.purchaseAmount,
                })
                .then((res) => {
                    this.setState({
                        coins: res.data
                    })
                    this.getPortfolio()
                })
            document.getElementById(event.target.id).reset()
        } else {
            axios.put('/coins/' + event.target.id, this.state)
                .then((res) => {
                    this.setState({
                        coins: res.data
                    })
                    this.getPortfolio()
                })
            document.getElementById(event.target.id).reset()
        }

    }
    remove = (event) => {
        axios.delete('/coins/' + event.target.id)
            .then((res) => {
                this.setState({
                    coins: res.data
                })
                this.getPortfolio()
            })
    }
    componentDidMount = () => {
        this.getPortfolio()
        axios.get("https://api.nomics.com/v1/currencies/ticker?key=7562ee9754eaae27647e8a6b82a1a527&ids=BTC,ETH,XRP&interval=1d,30d").then((res) => {
            console.log(res.data[0].price)
        })
    }
    render = () => {
        return (
            <div>
                <h1>Your Portfolio</h1>
                <div id="portfolio-cont">
                {this.state.coins.map((coin) => {
                    return (
                        <div className="coin-cont" key={coin.id}>
                            Coin: <p>{coin.name}</p>
                            Price: <p>{coin.currentPrice}</p>
                            Amount Owned: <p>{coin.purchaseAmount}</p>
                            Current Owned Value: <p>{coin.currentValue.toFixed(2)}</p>
                            <details>
                                <summary>Edit</summary>
                                <form id={coin.id} onSubmit={this.updateCoin}>
                                    <label htmlFor="purchaseAmount">Amount Owned</label>
                                    <input id="purchaseAmount" type="number" step="0.00001" onChange={this.handleChange}/>
                                    <br/>
                                    <label htmlFor="currentPrice">Current Price</label>
                                    <input id="currentPrice" type="number" step="0.00001" onChange={this.handleChange}/>
                                    <br/>
                                    <input type="submit" value="Update Coin" />
                                </form>
                            </details>
                            <button id={coin.id} onClick={this.remove}>Remove Coin</button>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }
}

export default Portfolio
