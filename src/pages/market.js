import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Market extends React.Component {
  state = {
    symbol: "",
    loading: false,
    coins: [],
  };

  getTopCoins = () => {
    this.setState({ loading: true });
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=10&page=1&percision=3`).then((res) => {
      console.log("Top 10: ", res.data);
      this.setState({
        coins: res.data,
        loading: false,
      });
    });
  };

  // Future Feature
  searchBySymbol = (event) => {
    event.preventDefault();
    axios.get("http://localhost:3000/cryptocurrency/info?id=1").then((res) => {
      console.log(res);
      this.setState({
        symbol: "",
      });
    });
  };

  // Check if coin is in the portfolio of current user
  alreadyOwned = () => {};

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  componentDidMount = () => {
    this.getTopCoins();
  };

  render = () => {
    if (this.state.loading) {
      return <div id="loading">Loading...</div>;
    } else {
      return (
        <div id="market-page">
          <h1>Top Coins by Market Cap</h1>
          <div id="market-cont">
            <div className="portfolio-labels">
              <div id="portfolio-label-logo" className="coin-img coin-item" />
              <p className="coin-item coin-name-cont">Crypto</p>
              <p className="coin-item coin-price">Price</p>
              <p className="coin-item coin-change">Daily Change</p>
              <p className="coin-details">Details</p>
            </div>
            {this.state.coins.map((coin) => {
              return (
                <div className="coin-cont" key={coin.id}>
                  <img className="coin-img coin-item" src={coin.image} alt="coin" />
                  <div className="coin-name-cont coin-item">
                    <p className="coin-name">{coin.name}</p>
                    <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
                  </div>
                  <p className="coin-price coin-item">${coin.current_price}</p>
                  <p className="coin-change coin-item" style={coin.price_change_percentage_24h > 0 ? { color: "green" } : { color: "red" }}>
                    {coin.price_change_percentage_24h}%
                  </p>
                  <button className="coin-details">
                    <Link
                      to={{
                        pathname: `/market-show/${coin.id}`,
                        state: {},
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
      );
    }
  };
}

export default Market;
