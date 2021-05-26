import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./forbiddenScreen.css";

import pizzerialogo from "../loginPage/images/pizzerialogo.png";

class ForbiddenScreen extends Component {
  state = {};
  render() {
    const { onLogOut, onRefresh } = this.props;
    return (
      <div className="forbiddenScreen container">
        <div className="row">
          <div className="logo brand col-12">
            <img src={pizzerialogo} alt="pizzeria" height="80px"></img>
          </div>
        </div>
        <div className="row">
          <div className="sessionExpired col-12">
            <h1>Session Expired</h1>
          </div>
        </div>
        <div className="row">
          <div className=" sessionexpireddiv col-12">
            <div>
              Sorry for the inconvenience caused. Your session has expired.
              Please click on refresh button and try again
            </div>
          </div>
        </div>
        <div className="row">
          <div className=" col-12">
            <button
              type="button"
              data-toggle="button"
              aria-pressed="false"
              autoComplete="off"
              className="refresh btn btn-warning"
              style={{ margin: "5px" }}
              onClick={() => onRefresh()}
            >
              Refresh
            </button>
            <button
              type="button"
              data-toggle="button"
              aria-pressed="false"
              autoComplete="off"
              className="logout btn btn-danger"
              style={{ margin: "5px" }}
              onClick={() => onLogOut()}
            >
              LogOut
            </button>
          </div>
        </div>
        <div className="forbiddenScreenbackground row"></div>
      </div>
    );
  }
}

export default ForbiddenScreen;
