import React from "react";

class LogOut extends React.Component {
  componentDidMount = () => {
    this.props.logOut();
  };

  render = () => {
    return (
      <div id="goodbye">
        <h1>See you next time!</h1>
      </div>
    );
  };
}

export default LogOut;
