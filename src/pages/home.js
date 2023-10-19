import React from "react";
import { Link } from "react-router-dom";

const apiDomain = process.env.REACT_APP_API_DOMAIN;

class Home extends React.Component {
  state = {
    name: "",
    symbol: "",
    purchasePrice: null,
    purchaseAmount: null,
    currentPrice: null,
  };
  componentDidMount = () => {
    // axios.get(apiDomain);
    console.log(apiDomain);
  };
  render = () => {
    let directTo;
    if (this.props.parentState.authorized) {
      directTo = "/portfolio";
    } else {
      directTo = "/signup";
    }

    return (
      <div id="home-cont">
        <h1 id="logo-header">Welcome to</h1>
        <img id="welcome-logo" src="/logos/LOGO_BLK.svg" alt="coinpurse-logo" />
        <br />
        <button className="get-started">
          <Link to={directTo}>Get Started</Link>
        </button>
      </div>
    );
  };
}

export default Home;
