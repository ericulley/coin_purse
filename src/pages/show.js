// Dependencies
import React, {useState, useEffect } from 'react'
import axios from 'axios'

// Components
import HistChart from '../components/hist_chart.js'
import Footer from '../components/footer.js'

const Show = (props) => {
    const [coinData, setCoinData] = useState(
        {
            details: {
                name: props.match.params.id
            }
        }
    )

    const [isLoading, setIsLoading] = useState(false)

    const [updated, setUpdated] = useState(false)

    const [amountOwned, setAmountOwned] = useState(
        {
            amountOwned: null
        }
    )

    const updateCoin = (event) => {
        setUpdated(true)
        event.preventDefault()
        props.location.state.amountOwned = amountOwned.amountOwned
        axios.put('https://mysterious-atoll-88793.herokuapp.com/wallets/' + props.location.state.walletID, amountOwned)
            .then((res) => {
                setUpdated(false)
            })
        document.getElementById(event.target.id).reset()
    }

    const removeCoin = (event) => {
        axios.delete('https://mysterious-atoll-88793.herokuapp.com/wallets/' + props.location.state.walletID)
            .then((res) => {
                props.history.push('/portfolio')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const formatData = (data) => {
        return data.map((el) => {
            return {
                t: el[0],
                y: el[1].toFixed(5)
            }
        })
    }

    const fetchData = async (coin) => {
        setIsLoading(true)
        const [day, week, month, year, details] = await Promise.all([
            axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1`)
                .then((res) => {
                    return res.data
                }),
            axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`)
                .then((res) => {
                    return res.data
                }),
            axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30`)
                .then((res) => {
                    return res.data
                }),
            axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=365`)
                .then((res) => {
                    return res.data
                }),
            axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
                .then((res) => {
                    return res.data[0]
                })
        ])
        setCoinData({
            day: formatData(day.prices),
            week: formatData(week.prices),
            month: formatData(month.prices),
            year: formatData(year.prices),
            details: details
        })
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData(props.match.params.id.toLowerCase())
    }, [updated])

    const render = () => {
        if (isLoading) {
            return <div id="loading">Loading...</div>
        } else {
            return (
                <div id="show-page">
                    <div id="edit-coin-cont">
                        <h3 id="add-coin-header">Wallet</h3>
                        <label htmlFor="amount">Amount Owned</label>
                        <p id="amount">{props.location.state.amountOwned}</p>
                        <label htmlFor="value">Total Value</label>
                        <p id="value">${(coinData.details.current_price * props.location.state.amountOwned).toFixed(2)}</p>
                        <hr id="edit-hr"/>
                        <form id="edit-coin-form" onSubmit={updateCoin}>
                            <h3 id="add-coin-header">Update</h3>
                            <label htmlFor="update">Amount Owned</label>
                            <input id="update" type="number" step="0.00001" onChange={(event) => {setAmountOwned({amountOwned: event.target.value})}}/>
                            <input id="update-coin-button" type="submit" value="Update" />
                        </form>
                        <hr id="edit-hr"/>
                        <h3 id="add-coin-header">Remove</h3>
                        <button id="remove-coin-button" onClick={removeCoin}>Remove Coin</button>
                    </div>
                    <div id="show-coin-cont">
                        <h2 id="show-header">{coinData.details.name}</h2>
                        <HistChart data={coinData}/>
                        <hr id="details-hr"/>
                        <div id="details-cont">
                            <div className="details-item">
                                <label>Current Price</label>
                                <p>${coinData.details.current_price}</p>
                            </div>
                            <div className="details-item">
                                <label>Market Cap</label>
                                <p>${coinData.details.market_cap}</p>
                            </div>
                            <div className="details-item">
                                <label>Market Cap Rank</label>
                                <p>{coinData.details.market_cap_rank}</p>
                            </div>
                            <div className="details-item">
                                <label>24hr $ Change</label>
                                <p>${coinData.details.price_change_24h}</p>
                            </div>
                            <div className="details-item">
                                <label>24hr % Change</label>
                                <p>%{coinData.details.price_change_percentage_24h}</p>
                            </div>
                            <div className="details-item">
                                <label>24hr High</label>
                                <p>${coinData.details.high_24h}</p>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
    }

    return render()
}

export default Show
