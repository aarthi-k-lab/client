import "./App.css";
import Login from "./components/loginPage/login.js";
import Home from "./components/dashBoard/home.js";
import React, { Component } from "react";

class App extends Component {
  state = { loginflag: false };

  componentDidMount = () => {
    console.log("********************************");
    console.log("component did mount");
    this.setState({ loginflag: localStorage.getItem("loginflag") });
    console.log("state login flag:" + this.state.loginflag);
    console.log("********************************");
  };

  handleLogin = (token, email, password) => {
    localStorage.setItem("loginflag", true);
    localStorage.setItem("token", token.token);
    localStorage.setItem("refreshtoken", token.refresh);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    console.log("loginflag: " + localStorage.getItem("loginflag"));
    console.log("token: " + localStorage.getItem("token"));
    console.log("refreshtoken: " + localStorage.getItem("refreshtoken"));

    this.setState({ loginflag: localStorage.getItem("loginflag") });

    console.log("***************************************");
    console.log("state loginflag: " + this.state.loginflag);
    console.log("***************************************");
  };

  handleLogout = () => {
    localStorage.setItem("loginflag", false);
    localStorage.setItem("token", "");
    localStorage.setItem("refreshtoken", "");
    localStorage.setItem("email", "");
    localStorage.setItem("password", "");

    console.log("loginflag: " + localStorage.getItem("loginflag"));
    console.log("token: " + localStorage.getItem("token"));
    console.log("refreshtoken: " + localStorage.getItem("refreshtoken"));

    this.setState({ loginflag: localStorage.getItem("loginflag") });

    console.log("***************************************");
    console.log("state loginflag: " + this.state.loginflag);
    console.log("***************************************");
  };

  render() {
    return (
      <div className="App">
        {this.state.loginflag !== true ? (
          <Login onLogging={this.handleLogin} />
        ) : (
          <Home onLogOut={this.handleLogout} />
        )}
      </div>
    );
  }
}

export default App;
