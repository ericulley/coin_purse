import React from 'react'
import axios from 'axios'
const API_KEY = process.env.REACT_APP_NOMICS_API_KEY

class Portfolio extends React.Component {
    state = {
        name: '',
        symbol: '',
        purchaseAmount: null,
        editPurchaseAmount: null,
        coins: [],
    }
    handleAddCoinChange = (event) => {
        this.setState({
            [event.target.id]: event.target.type === 'number' ? event.target.value - 0 : event.target.value.toLowerCase(),
        })
    }
    handleUpdateCoinChange = (event) => {
        this.setState({
            [event.target.id]: event.target.type === 'number' ? event.target.value - 0 : event.target.value,
        })
    }
    createNewCoin = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8080/coins', this.state)
            .then((res) => {
                axios.post('http://localhost:8080/wallets',
                    {
                        client: this.props.parentState.userID,
                        coinId: res.data.id,
                        coinSymbol: res.data.symbol,
                        amountOwned: this.state.purchaseAmount
                    })
                .then((res) => {
                console.log(res.data)
                this.getPortfolio()
            })
        })
        document.getElementById('new-coin-form').reset()
    }
    updateCoin = (event) => {
        event.preventDefault()
        axios.put('http://localhost:8080/coins/' + event.target.id,
            {
                purchaseAmount: this.state.editPurchaseAmount
            })
            .then((res) => {
                this.getPortfolio()
            })
        document.getElementById(event.target.id).reset()
    }
    getPortfolio = () => {
        axios.get('http://localhost:8080/wallets/' + this.props.parentState.userID)
            .then((res) => {
                this.setState({
                    coins: []
                })
                for (let i = 0; i < res.data.length; i++) {
                    console.log(res.data[i].coinId)
                    axios.get('http://localhost:8080/coins/' + res.data[i].coinId)
                        .then((res2) => {
                            console.log(res2.data)
                            this.state.coins.push(res2.data)
                            this.setCurrentPrice()
                        })
                }
            })
    }
    setCurrentPrice = () => {
        // Fetch Price for Each Coin
        this.state.coins.forEach((coin, i) => {
            // Fetch Price
            axios
                .get(`https://api.nomics.com/v1/currencies/ticker?key=${API_KEY}&ids=${coin.symbol.toUpperCase()}&interval=1d`)
                // Update prices in mirror array
                .then((res) => {
                    this.state.coins[i].currentPrice = res.data[0].price
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }
    remove = (event) => {
        axios.delete('http://localhost:8080/wallets/' + event.target.id)
            .then((res) => {
            this.getPortfolio()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount = () => {
        this.getPortfolio()
    }
    render = () => {
        return (
            <div>
                <h1>Add Coin</h1>
                <form id="new-coin-form" onSubmit={this.createNewCoin}>
                    <label htmlFor="name">Coin Name</label>
                    <input id="name" type="text" onChange={this.handleAddCoinChange}/>
                    <br/>
                    <label htmlFor="symbol">Coin Symbol</label>
                    <input id="symbol" type="text" onChange={this.handleAddCoinChange}/>
                    <br/>
                    <label htmlFor="purchaseAmount">Purchase Amount</label>
                    <input id="purchaseAmount" type="number" step="0.00001" onChange={this.handleAddCoinChange}/>
                    <br/>
                    <input type="submit" value="Add To Portfolio" />
                </form>
                <h1>Portfolio</h1>
                <div id="portfolio-cont">
                {this.state.coins.map((coin) => {
                    return (
                        <div className="coin-cont" key={coin.id}>
                            <div className="coin-display">
                                <p>{coin.name[0].toUpperCase() + coin.name.slice(1)}</p>
                                <p>{coin.symbol.toUpperCase()}</p>
                            </div>
                            Price: <p>${(coin.currentPrice - 0).toFixed(2)}</p>
                            Amount Owned: <p>{coin.purchaseAmount}</p>
                            Current Owned Value: <p>${(coin.purchaseAmount * coin.currentPrice).toFixed(2)}</p>
                            <details>
                                <summary>Edit</summary>
                                <form id={coin.id} onSubmit={this.updateCoin}>
                                    <label htmlFor="editPurchaseAmount">Amount Owned</label>
                                    <input id="editPurchaseAmount" type="number" step="0.00001" onChange={this.handleUpdateCoinChange}/>
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
