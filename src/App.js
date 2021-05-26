import "./App.css";
import Login from "./components/loginPage/login.js";
import Home from "./components/dashBoard/home.js";
import React, { Component } from "react";

class App extends Component {
  state = { loginflag: localStorage.getItem("loginflag"), refreshtoken: true };

  componentDidMount = () => {
    this.setState({ loginflag: localStorage.getItem("loginflag") });
  };

  handleLogin = (token, email, password) => {
    localStorage.setItem("loginflag", true);
    localStorage.setItem("token", token.token);
    localStorage.setItem("refreshtoken", token.refresh);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    this.setState({ loginflag: localStorage.getItem("loginflag") });
  };

  handleLogout = async () => {
    try {
      const logouturl = "https://thawing-ridge-74415.herokuapp.com/logout";
      let logOutRes = await fetch(logouturl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("refreshtoken"),
        },
      });
      let logOutData = await logOutRes.json();
      if (logOutData.error === undefined) {
        localStorage.setItem("loginflag", false);
        localStorage.setItem("token", "");
        localStorage.setItem("refreshtoken", "");
        localStorage.setItem("email", "");
        localStorage.setItem("password", "");

        this.setState({ loginflag: localStorage.getItem("loginflag") });
      } else {
        console.log(logOutData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleRefreshToken = async () => {
    try {
      let user = { email: localStorage.getItem("email") };
      let refreshUrl = "https://thawing-ridge-74415.herokuapp.com/refresh";
      let tokenRes = await fetch(refreshUrl, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("refreshtoken"),
        },
      });
      let tokenData = await tokenRes.json();
      if (tokenData.error === undefined) {
        localStorage.setItem("token", tokenData.token);
        localStorage.setItem("refreshtoken", tokenData.refresh);
        window.location.reload(false);
      } else {
        console.log(tokenData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.loginflag !== "true" ? (
          <Login onLogging={this.handleLogin} />
        ) : (
          <Home
            onLogOut={this.handleLogout}
            onRefresh={this.handleRefreshToken}
          />
        )}
      </div>
    );
  }
}

export default App;
