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
        axios.get('https://mysterious-atoll-88793.herokuapp.com/coins').then(
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
            axios.put('https://mysterious-atoll-88793.herokuapp.com/coins/' + event.target.id,
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
            axios.put('https://mysterious-atoll-88793.herokuapp.com/coins/' + event.target.id,
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
            axios.put('https://mysterious-atoll-88793.herokuapp.com/coins/' + event.target.id, this.state)
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
        axios.delete('https://mysterious-atoll-88793.herokuapp.com/coins/' + event.target.id)
            .then((res) => {
                this.setState({
                    coins: res.data
                })
                this.getPortfolio()
            })
    }
    componentDidMount = () => {
        this.getPortfolio()
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
