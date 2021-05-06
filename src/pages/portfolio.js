import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_NOMICS_API_KEY



class Portfolio extends React.Component {
    state = {
        symbol: '',
        amount: null,
        editPurchaseAmount: null,
        coins: [],
        loading: false
    }
    handleAddCoinChange = (event) => {
        this.setState({
            [event.target.id]: event.target.type === 'number' ? event.target.value - 0 : event.target.value.toLowerCase(),
        })
    }
    createNewCoin = (event) => {
        event.preventDefault()
        axios.post('https://mysterious-atoll-88793.herokuapp.com/wallets',
            {
                client: this.props.parentState.userID,
                coinSymbol: this.state.symbol,
                amountOwned: this.state.amount
            })
            .then((res) => {
            console.log(res.data)
            this.getPortfolio()
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
        document.getElementById('new-coin-form').reset()
    }
    getPortfolio = () => {
        this.setState({loading: true})
        axios.get('https://mysterious-atoll-88793.herokuapp.com/wallets/' + this.props.parentState.userID)
            .then((res) => {
                this.setState({
                    coins: res.data
                })
                if (this.state.coins.length) {
                    this.setCurrentPrice()
                } else {
                    this.setState({
                        loading: false
                    })
                }
            })
    }
    setCurrentPrice = () => {
        // Check for Coins in Porfolio
        let coinsToFetch = ''
        // Format Coin Symbols for Fetch
        this.state.coins.forEach((coin, i) => {
            i === this.state.coins.length - 1 ? coinsToFetch += coin.coinSymbol.toUpperCase() : coinsToFetch += (coin.coinSymbol.toUpperCase() + ',')
        })
        // Fetch Prices
        axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${API_KEY}&ids=${coinsToFetch}&interval=1d`)
            .then((res) => {
                // Sort Results
                res.data.sort((a, b) => {
                    if (a.symbol > b.symbol) {
                        return 1
                    } else if (a.symbol < b.symbol) {
                        return -1
                    } else {
                        return 0
                    }
                })
                // ShallowCopy
                let shallowCopy = this.state.coins
                // Sort ShallowCopy
                shallowCopy.sort((a, b) => {
                    if (a.coinSymbol > b.coinSymbol) {
                        return 1
                    } else if (a.coinSymbol < b.coinSymbol) {
                        return -1
                    } else {
                        return 0
                    }
                })
                // Set Prices to Copy
                res.data.forEach((response, i) => {
                    shallowCopy[i].currentPrice = (response.price - 0).toFixed(5)
                    shallowCopy[i].name = response.name
                    shallowCopy[i].img = response.logo_url
                })
                // Set Copy to Actual Prices
                this.setState({
                    coins: shallowCopy,
                    loading: false
                })
            })
    }
    componentDidMount = () => {
        this.getPortfolio()
    }
    render = () => {
        if (this.state.loading) {
            return <div id="loading">Loading...</div>
        } else {
            return (
                <div id="portfolio-page">
                    <form id="new-coin-form" onSubmit={this.createNewCoin}>
                        <h3 id="add-coin-header">Add Coin</h3>
                        <label htmlFor="symbol">Coin Symbol</label>
                        <input id="symbol" type="text" onChange={this.handleAddCoinChange}/>
                        <label htmlFor="amount">Amount Owned</label>
                        <input id="amount" type="number" step="0.00001" onChange={this.handleAddCoinChange}/>
                        <input id="add-to-portfolio" type="submit" value="Add To Portfolio" />
                    </form>
                    <div id="portfolio-cont">
                        <h2 id="portfolio-header">Portfolio</h2>
                        <div id="portfolio">
                            <div className="portfolio-labels">
                                <div id="portfolio-label-logo" className="coin-img coin-item"/>
                                <p className="coin-item coin-name-cont">Crypto</p>
                                <p className="coin-price coin-item">Price</p>
                                <p className="coin-value-cont amt-owned">Owned</p>
                                <p className="coin-details">Details</p>
                            </div>
                        {this.state.coins.map((coin) => {
                            let coinName = coin.name.replace(/\s/g, '')
                            if (coinName === "bitcoincash") {
                                coin.name = "bitcoin-cash"
                            } else {
                                coin.name = coinName
                            }
                            return (
                                <div className="coin-cont" key={coin.id}>
                                    <img className="coin-img coin-item" src={coin.img} alt="coin" />
                                    <div className="coin-name-cont coin-item">
                                        <p className="coin-name">{coin.name}</p>
                                        <p className="coin-symbol">{coin.coinSymbol.toUpperCase()}</p>
                                    </div>
                                    <p className="coin-price coin-item">${coin.currentPrice}</p>
                                    <div className="coin-value-cont coin-item">
                                        <p className="amt-owned">Amount: {coin.amountOwned}</p>
                                        <p className="amt-value">Value: ${(coin.amountOwned * coin.currentPrice).toFixed(2)}</p>
                                    </div>

                                    <button className="coin-details">
                                        <Link to={{
                                                pathname: `/show/${coin.name}`,
                                                state: {
                                                    walletID: coin.id,
                                                    amountOwned: coin.amountOwned
                                                }
                                            }}>View Details</Link>
                                    </button>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Portfolio
