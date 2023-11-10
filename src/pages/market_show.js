// Dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import HistChart from "../components/hist_chart.js";

const apiDomain = process.env.REACT_APP_API_DOMAIN;

const MarketShow = (props) => {
  const [coinData, setCoinData] = useState({
    details: {
      id: props.match.params.id,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(5),
      };
    });
  };

  const fetchData = async (coin) => {
    setIsLoading(true);
    const [day, week, month, year, details] = await Promise.all([
      axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1`).then((res) => {
        return res.data;
      }),
      axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`).then((res) => {
        return res.data;
      }),
      axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30`).then((res) => {
        return res.data;
      }),
      axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=365`).then((res) => {
        return res.data;
      }),
      axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`).then((res) => {
        return res.data[0];
      }),
    ]);

    setCoinData({
      day: formatData(day.prices),
      week: formatData(week.prices),
      month: formatData(month.prices),
      year: formatData(year.prices),
      details: details,
    });
    setIsLoading(false);
  };

  const addToPortfolio = () => {
    console.log("Coin Details: ", coinData.details);
    axios
      .post(`${apiDomain}/api/v2/wallets`, {
        owner: props.parentState.userID,
        coinSymbol: coinData.details.symbol,
        coinId: coinData.details.id,
        coinImg: coinData.details.image,
        amountOwned: 0,
      })
      .then((res) => {
        props.history.push("/portfolio");
      })
      .catch((err) => {
        alert("Please login and try again.\nError: " + err.response.data.message);
      });
  };

  useEffect(() => {
    console.log("Props: ", props);
    let coin = props.match.params.id.toLowerCase();
    coin = coin.replace(/\s/g, "");
    if (coin === "bitcoincash") {
      coin = "bitcoin-cash";
    } else if (coin === "uniswapprotocoltoken") {
      coin = "uniswap";
    }
    fetchData(coin);
  }, [props]);

  const render = () => {
    if (isLoading) {
      return <div id="loading">Loading...</div>;
    } else {
      return (
        <div id="show-page">
          <div id="market-watch-cont">
            <h3 id="add-coin-header">Market Watch</h3>

            <button id="add-coin-button" onClick={addToPortfolio}>
              Add to Portfolio
            </button>
          </div>
          <div id="show-coin-cont">
            <h2 id="show-header">{coinData.details.name}</h2>
            <HistChart data={coinData} />
            <hr id="details-hr" />
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
      );
    }
  };

  return render();
};

export default MarketShow;
