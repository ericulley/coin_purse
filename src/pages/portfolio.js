import React from 'react'
import axios from 'axios'

class Portfolio extends React.Component {
    state = {
        name: '',
        symbol: '',
        purchaseAmount: null,
        editPurchaseAmount: null,
        coins: []
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
        axios.post('/coins', this.state).then((res) => {
            console.log(res)
        })
        document.getElementById('new-coin-form').reset()
        this.getPortfolio()
    }
    updateCoin = (event) => {
        event.preventDefault()
        axios.put('/coins/' + event.target.id,
            {
                purchaseAmount: this.state.editPurchaseAmount
            })
            .then((res) => {
                // this.setState({
                //     coins: res.data
                // })
                this.getPortfolio()
            })
        document.getElementById(event.target.id).reset()
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
    getPortfolio = () => {
        axios.get('/coins')
            .then((res) => {
                this.setState({
                    coins: res.data
                })
                this.setCurrentPrice()
            }
        )
    }
    setCurrentPrice = () => {
        // Create Mirror Array
        const coinsArr = []
        // Fetch Price for Each Coin
        this.state.coins.forEach((coin, i) => {
            // Load mirror array
            coinsArr.push(coin)
            // Fetch Price
            axios
                .get(`https://api.nomics.com/v1/currencies/ticker?key=7562ee9754eaae27647e8a6b82a1a527&ids=${coin.symbol.toUpperCase()}&interval=1d`)
                // Update prices in mirror array
                .then((res) => {
                    console.log(res.data[0].price)
                    console.log(coinsArr[i])
                    coinsArr[i].currentPrice = res.data[0].price
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        console.log("This is coinArr on line 44", coinsArr)
        // Set Mirror Array to Actual Array
        this.setState({
            coins: coinsArr
        })
        console.log("This is the coins state on line 49: ", this.state.coins)
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
                <h1>Your Portfolio</h1>
                <div id="portfolio-cont">
                {this.state.coins.map((coin) => {
                    return (
                        <div className="coin-cont" key={coin.id}>
                            Coin: <p>{coin.name}</p>
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
