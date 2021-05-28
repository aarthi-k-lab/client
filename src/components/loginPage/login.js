import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import emailjs from "emailjs-com";
import axios from "axios";

import pizzerialogo from "./images/pizzerialogo.png";
import Leaf1 from "./images/leaf1.png";
import PizzaQuote from "./images/pizzaquote.png";

import LoginForm from "./forms/loginform.js";
import ForgetPasswordForm from "./forms/forgetpasswordform.js";
import SignUpForm from "./forms/signupform.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./login.css";

class Login extends Component {
  state = {
    token: {},
    error: "",
    otpsentFlag: false,
    otp: "",
    regMsg: "",
    regMsgPass: "",
  };

  handleLogin = async (email, password) => {
    try {
      const user = { email: email, password: password };

      const mockapiurl = "https://thawing-ridge-74415.herokuapp.com/login";
      const tokenResponse = await fetch(mockapiurl, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json;characterset=UTF-8",
        },
      });
      let token = await tokenResponse.json();
      if (token.error === undefined) {
        this.setState({ token });
        this.setState({ error: "" });
        this.props.onLogging(this.state.token, email, password);
      } else {
        this.setState({ error: token.error });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleSignUp = async (email, username) => {
    const emailUrl =
      "https://emailvalidation.abstractapi.com/v1/?api_key=d659a25ef9f74fe780e9343082f23c2b&email=" +
      email;
    try {
      var component = this;
      await axios
        .get(emailUrl)
        .then((response) => {
          const data = response.data;
          if (data.deliverability === "DELIVERABLE") {
            let val = Math.floor(1000 + Math.random() * 9000);
            var templateParams = {
              email: email,
              to_name: username,
              from_name: "Pizzeria",
              message:
                "Your OTP is " + val + ". Please don't share it with others.",
              reply_to: "aarthikannan2103@gmail.com",
            };
            emailjs.init("user_WWiMIOlBQzNkBsHGDUpi3");
            emailjs
              .send(
                "service_ojjxb8j",
                "template_2spb6jj",
                templateParams,
                "user_WWiMIOlBQzNkBsHGDUpi3"
              )
              .then(
                function (response) {
                  component.setState({ otpsentFlag: true, otp: String(val) });
                },
                function (error) {
                  console.log("FAILED...", error);
                }
              );
          } else {
            component.setState({ error: "Email mentioned is undeliverable" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  setDefaultMsg = () => {
    this.setState({ regMsg: "", otpsentFlag: false, regMsgPass: "" });
  };

  registerUser = async (user) => {
    try {
      const mockapiurl = "https://thawing-ridge-74415.herokuapp.com/register";
      const newUserRes = await fetch(mockapiurl, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json;characterset=UTF-8",
        },
      });
      const newUser = await newUserRes.json();
      if (!newUser.error) {
        this.setState({ regMsg: "User Registerd Successfully", error: "" });
      } else {
        this.setState({
          regMsg:
            "User is not registered Please make sure the email given is not already registered",
          error: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleSetNewPassword = async (email, password) => {
    const user = { email: email, password: password };
    const mockapiurl = "https://thawing-ridge-74415.herokuapp.com/setPassword";
    const newUserRes = await fetch(mockapiurl, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json;characterset=UTF-8",
      },
    });
    const newUser = await newUserRes.json();
    if (!newUser.error) {
      this.setState({ regMsgPass: "Password Changed Successfully" });
    } else {
      this.setState({
        regMsgPass:
          "Password is not registered Make sure the email given is already registered",
      });
    }
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="logo brand col-12">
              <img src={pizzerialogo} alt="pizzeria"></img>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2 styleleaf1">
              <img src={Leaf1} alt="styleleaf1"></img>
            </div>
            <div className="col-lg-8 pizza_quote">
              <img src={PizzaQuote} alt="pizza_quote"></img>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2 customizepizza"></div>
            <div className="col-lg-8 customizepizza">
              Customize your own <span style={{ color: "white" }}>10'' </span>
              Pizza
            </div>
          </div>
          <Router>
            <Switch>
              <Route path="/" exact>
                <LoginForm
                  onLogging={this.handleLogin}
                  error={this.state.error}
                  setDefaultMsg={this.setDefaultMsg}
                />
              </Route>
              <Route path="/forgetPassword">
                <ForgetPasswordForm
                  otp={this.state.otp}
                  otpsentFlag={this.state.otpsentFlag}
                  onSubmitOTP={this.handleSignUp}
                  error={this.state.error}
                  onSettingNewFlag={this.handleSetNewPassword}
                  regMsgPass={this.state.regMsgPass}
                  clearError={() => this.setState({ error: "" })}
                />
              </Route>
              <Route path="/signUp">
                <SignUpForm
                  onSignUp={this.handleSignUp}
                  error={this.state.error}
                  otpsentFlag={this.state.otpsentFlag}
                  otp={this.state.otp}
                  registerUser={this.registerUser}
                  regMsg={this.state.regMsg}
                  clearError={() => this.setState({ error: "" })}
                />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default Login;
