import React from "react";
import axios from "axios";

const apiDomain = process.env.REACT_APP_API_DOMAIN;

// New User Sign Up
class LogIn extends React.Component {
  state = {
    email: "",
    password: "",
    sessions: [],
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  newSession = (event) => {
    event.preventDefault();
    axios.post(`${apiDomain}/api/v2/users/sessions`, this.state).then((res) => {
      if (res.data.authorized) {
        this.setState({
          email: "",
          password: "",
          sessions: res.data,
        });
        this.props.getUserData(res.data);
      } else {
        alert("Uknown or invalid credentials.");
      }
    });
    document.getElementById("login-form").reset();
  };

  componentDidMount = () => {
    if (this.props.location.state) {
      this.setState({
        email: this.props.location.state.email,
      });
    }
  };

  render = () => {
    return (
      <div id="login-cont">
        <img className="logo" src="/logos/ICON.svg" alt="coinpurse-logo" />
        <h2>Log In</h2>
        <form id="login-form" onSubmit={this.newSession}>
          <label htmlFor="email">Email:</label>
          <input id="email" onKeyUp={this.handleChange} type="text" defaultValue={this.props.location.state ? this.props.location.state.email : ""} />
          <br />
          <label htmlFor="password">Password:</label>
          <input id="password" onKeyUp={this.handleChange} type="password" />
          <br />
          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  };
}

export default LogIn;
