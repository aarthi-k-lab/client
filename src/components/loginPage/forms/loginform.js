import React, { Component } from "react";
import { Link } from "react-router-dom";
class LoginForm extends Component {
  state = { email: "", password: "" };

  componentDidMount = () => {
    this.props.setDefaultMsg();
  };
  onTrigger = (event) => {
    this.props.onLogging(this.state.email, this.state.password);
    event.preventDefault();
  };
  render() {
    const { error } = this.props;
    return (
      <div className="row LoginForm">
        <div className="icon">
          <i className="fas">&#xf0c0;</i>
        </div>

        <div className="loginFormdiv form">
          <form id="loginForm" onSubmit={this.onTrigger}>
            <div>MEMBER LOGIN</div>
            <div className="input-group flex-nowrap email row">
              <span
                className="input-group-text col-2"
                id="addon-wrapping"
                style={{ marginRight: "8px" }}
              >
                📧
              </span>
              <input
                type="email"
                className="form-control col-8"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="addon-wrapping"
                required
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
              ></input>
            </div>
            <div className="input-group flex-nowrap password row">
              <span
                className="input-group-text col-2"
                id="addon-wrapping"
                style={{ marginRight: "8px" }}
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/password-window.png"
                  height="20px"
                  alt="password"
                />
              </span>
              <input
                type="password"
                className="form-control col-8"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="addon-wrapping"
                required
                onChange={(event) =>
                  this.setState({ password: event.target.value })
                }
              ></input>
            </div>
            <div className="errormessage">{error}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="submit"
                data-toggle="button"
                aria-pressed="false"
                autoComplete="off"
                className=" btn btn-success btn-md"
                style={{ margin: "5px" }}
              >
                Login
              </button>
              <span className="forgetPassword">
                <Link className="link" to="/forgetPassword">
                  Forget Password?
                </Link>
              </span>
            </div>
            <div className="signupdiv ">
              <span style={{ margin: "5px" }}>Don't have an account? </span>
              <Link className="linkRegister" to="/signUp">
                REGISTER HERE
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
