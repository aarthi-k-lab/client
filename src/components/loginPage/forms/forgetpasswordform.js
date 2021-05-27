import React, { Component } from "react";
import { Link } from "react-router-dom";

class ForgetPasswordForm extends Component {
  state = {
    email: "",
    username: "Customer",
    otp: "",
    otpsubmitflag: false,
    error: "",
    newPassword: "",
    confirmPassword: "",
    errorNewPassword: "",
    otpsentFlag: false,
  };

  handleotpSent = async (event) => {
    this.props.onSubmitOTP(this.state.email, this.state.username);
    event.preventDefault();
  };

  handleSubmitOTP = async (event) => {
    if (this.props.otp === this.state.otp) {
      this.setState({ otpsubmitflag: true });
      this.setState({ error: "" });
    } else {
      this.setState({ otpsubmitflag: false, error: "OTP doesn't match" });
    }
    event.preventDefault();
  };

  handleSetNewPassword = async (event) => {
    if (this.state.confirmPassword === this.state.newPassword) {
      this.props.onSettingNewFlag(this.state.email, this.state.newPassword);
    } else {
      this.setState({ errorNewPassword: "Password doesn't match" });
    }
    event.preventDefault();
  };
  render() {
    const { otpsentFlag, regMsgPass, error } = this.props;
    return (
      <div className="row forgetForm">
        <div className="col-8 col-md-4 icon">
          <i className="fas">&#xf0c0;</i>
        </div>

        <div className="col-8 col-md-4 forgetPasswordFormdiv form">
          {otpsentFlag === false ? (
            <form id="forgetPasswordForm" onSubmit={this.handleotpSent}>
              <div>RESET PASSWORD</div>
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
              <div>{error}</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="submit"
                  data-toggle="button"
                  aria-pressed="false"
                  autoComplete="off"
                  className=" btn btn-success btn-md"
                  style={{ margin: "5px" }}
                >
                  Send OTP
                </button>
              </div>
            </form>
          ) : this.state.otpsubmitflag === false ? (
            <>
              <form id="otpSubmitform" onSubmit={this.handleSubmitOTP}>
                <div>RESET PASSWORD</div>
                <div className="input-group flex-nowrap row email">
                  <input
                    type="text"
                    className="form-control col-12"
                    placeholder="Enter the OTP sent to the mail"
                    aria-label="OTP"
                    aria-describedby="addon-wrapping"
                    required
                    onChange={(event) =>
                      this.setState({ otp: event.target.value })
                    }
                  ></input>
                </div>
                <div>{this.state.error}</div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    type="submit"
                    className=" btn btn-success btn-md"
                    style={{ margin: "5px" }}
                  >
                    Submit OTP
                  </button>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    type="button"
                    data-toggle="button"
                    aria-pressed="false"
                    autoComplete="off"
                    className=" btn btn-success btn-md"
                    style={{ margin: "5px" }}
                    onClick={this.handleotpSent}
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            </>
          ) : regMsgPass.length === 0 ? (
            <form id="setNewPasswordform" onSubmit={this.handleSetNewPassword}>
              <div>RESET PASSWORD</div>
              <div className="input-group flex-nowrap row password">
                <span className="input-group-text col-2" id="addon-wrapping">
                  <img
                    src="https://img.icons8.com/nolan/64/forgot-password.png"
                    height="20px"
                    alt="password"
                  />
                </span>
                <input
                  type="password"
                  className="form-control col-10"
                  placeholder="New Password"
                  aria-label="New Password"
                  aria-describedby="addon-wrapping"
                  required
                  onChange={(event) =>
                    this.setState({ newPassword: event.target.value })
                  }
                ></input>
              </div>
              <div className="input-group flex-nowrap row password">
                <span className="input-group-text col-2" id="addon-wrapping">
                  <img
                    src="https://img.icons8.com/nolan/64/forgot-password.png"
                    height="20px"
                    alt="password"
                  />
                </span>
                <input
                  type="password"
                  className="form-control col-10"
                  placeholder="Confirm New Password"
                  aria-label="Confirm New Password"
                  aria-describedby="addon-wrapping"
                  required
                  onChange={(event) =>
                    this.setState({ confirmPassword: event.target.value })
                  }
                ></input>
              </div>
              <div>{this.state.errorNewPassword}</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="submit"
                  data-toggle="button"
                  aria-pressed="false"
                  autoComplete="off"
                  className=" btn btn-success btn-md"
                  style={{ margin: "5px" }}
                >
                  Set New Password
                </button>
              </div>
            </form>
          ) : (
            <>{regMsgPass}</>
          )}
          <div className="loginbtndiv">
            <Link className="linkLogin" to="/">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgetPasswordForm;
