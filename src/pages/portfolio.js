import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const apiDomain = process.env.REACT_APP_API_DOMAIN;

class Portfolio extends React.Component {
  state = {
    symbol: "",
    amount: null,
    editPurchaseAmount: null,
    coins: [],
    loading: false,
  };

  handleAddCoinChange = (event) => {
    this.setState({
      [event.target.id]: event.target.type === "number" ? event.target.value - 0 : event.target.value.toLowerCase(),
    });
  };

  createNewCoin = (event) => {
    event.preventDefault();
    console.log("User ID: ", this.props.parentState.userID);
    axios
      .post(`${apiDomain}/api/v2/wallets`, {
        user: this.props.parentState.userID,
        coinSymbol: this.state.symbol,
        amountOwned: this.state.amount,
      })
      .then((res) => {
        console.log(res.data);
        this.getPortfolio();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    document.getElementById("new-coin-form").reset();
  };

  getPortfolio = () => {
    this.setState({ loading: true });
    axios.get(`${apiDomain}/api/v2/wallets/` + this.props.parentState.userID).then((res) => {
      // console.log("Wallet Response: ", res.data);
      res.data.forEach((item) => (item.idString = item.id.toString()));
      console.log("Wallet Response: ", res.data);
      this.setState({
        coins: res.data || [],
      });
      if (this.state.coins?.length) {
        this.setCurrentPrice();
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };

  setCurrentPrice = () => {
    // Check for Coins in Porfolio
    let coinsToFetch = "";
    // Format Coin Symbols for Fetch
    this.state.coins.forEach((coin, i) => {
      coinsToFetch += coin.coinId + ",";
    });
    console.log("Coins to Fetch: ", coinsToFetch);
    // Fetch Prices
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinsToFetch}&vs_currencies=usd`).then((res) => {
      console.log("Get Prices Repsonse: ", res.data);
      for (const coin in res.data) {
        const foundCoin = this.state.coins.findIndex((c) => c.coinId === coin);
        if (foundCoin > -1) {
          console.log("Found! ", coin);
          this.state.coins[foundCoin].currentPrice = res.data[coin].usd;
        }
      }
      this.setState({
        loading: false,
      });
    });
  };

  componentDidMount = () => {
    this.getPortfolio();
  };

  render = () => {
    if (this.state.loading) {
      return <div id="loading">Loading...</div>;
    } else {
      return (
        <div id="portfolio-page">
          <form id="new-coin-form" onSubmit={this.createNewCoin}>
            <h3 id="add-coin-header">Add Coin</h3>
            <label htmlFor="symbol">Coin Symbol</label>
            <input id="symbol" type="text" onChange={this.handleAddCoinChange} />
            <label htmlFor="amount">Amount Owned</label>
            <input id="amount" type="number" step="0.00001" onChange={this.handleAddCoinChange} />
            <input id="add-to-portfolio" type="submit" value="Add To Portfolio" />
          </form>
          <div id="portfolio-cont">
            <h2 id="portfolio-header">Portfolio</h2>
            <div id="portfolio">
              <div className="portfolio-labels">
                <div id="portfolio-label-logo" className="coin-img coin-item" />
                <p className="coin-item coin-name-cont">Crypto</p>
                <p className="coin-price coin-item">Price</p>
                <p className="coin-value-cont amt-owned">Owned</p>
                <p className="coin-details">Details</p>
              </div>
              {this.state.coins &&
                this.state.coins.map((coin) => {
                  console.log("Coin in Portfolio: ", coin);
                  return (
                    <div className="coin-cont" key={coin.coinSymbol}>
                      <img className="coin-img coin-item" src={coin.coinImg} alt="coin" />
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
                        <Link
                          to={{
                            pathname: `/show/${coin.coinId}`,
                            state: coin,
                          }}
                        >
                          View Details
                        </Link>
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
    }
  };
}

export default Portfolio;
