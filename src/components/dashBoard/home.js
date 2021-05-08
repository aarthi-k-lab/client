import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeBoard from "./boards/homeboard.js";
import Menu from "./boards/menu.js";
import CustomizePizza from "./boards/customizepizza.js";
import AboutUs from "./boards/aboutus.js";
import ForbiddenScreen from "./forbiddenScreen.js";

class Home extends Component {
  state = { forbiddenState: false, user: {} };

  componentDidMount = async () => {
    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");
    let token = localStorage.getItem("token");

    console.log("Authorization: bearer " + token);
    try {
      let userListUrl = "https://thawing-ridge-74415.herokuapp.com/api/users";
      let userRes = await fetch(userListUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
      });
      let userData = await userRes.json();
      if (userData.status === 403) {
      } else {
        let user = userData.find(
          (user) => user.email === email && user.password === password
        );
        console.log(email);
        this.setState({ user });
      }
      console.log(this.state.user);
    } catch (err) {
      console.log("Forbidden");
      this.setState({ forbiddenState: true });
    }
  };
  render() {
    const { onLogOut } = this.props;
    return (
      <>
        <button type="button" onClick={() => onLogOut()}>
          LogOut
        </button>
        {this.state.forbiddenState === false ? (
          <Router>
            <Switch>
              <Route path="/" exact>
                <HomeBoard />
              </Route>
              <Route path="/Menu">
                <Menu />
              </Route>
              <Route path="/customizePizza">
                <CustomizePizza />
              </Route>
              <Route path="/aboutUs">
                <AboutUs />
              </Route>
            </Switch>
          </Router>
        ) : (
          <ForbiddenScreen />
        )}
      </>
    );
  }
}

export default Home;
