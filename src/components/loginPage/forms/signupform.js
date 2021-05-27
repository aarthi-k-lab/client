import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignUpForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
    regMsg: "",
  };

  onTrigger = async (event) => {
    this.props.onSignUp(this.state.email, this.state.username);
    event.preventDefault();
  };

  handleSubmitOTP = (event) => {
    if (this.state.otp === this.props.otp) {
      let user = {
        role: "client",
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
      };
      this.setState({
        username: "",
        email: "",
        password: "",
        phone: "",
        otp: "",
      });
      this.props.registerUser(user);
    }
    event.preventDefault();
  };

  render() {
    const { otpsentFlag, regMsg } = this.props;
    return (
      <div className="SignUpForm">
        <div className="row">
          <div className="col-2 col-md-6"></div>
          <div className="col-10 col-md-6 members">
            <div className="row registerform">
              <div className="col-12 col-md-8">
                <i className="fas">&#xf0c0;</i>
              </div>

              <div className="signupFormdiv form col-12 col-md-8">
                {otpsentFlag === false ? (
                  <form id="signupForm" onSubmit={this.onTrigger}>
                    <div>MEMBER SIGN UP</div>
                    <div className="input-group flex-nowrap row username">
                      <span
                        className="input-group-text col-3 col-md-2"
                        id="addon-wrapping"
                      >
                        <img
                          src="https://img.icons8.com/fluent/48/000000/username.png"
                          height="20px"
                          alt="username"
                        />
                      </span>
                      <input
                        type="text"
                        className="form-control col-9 col-md-10"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        required
                        onChange={(event) =>
                          this.setState({ username: event.target.value })
                        }
                      ></input>
                    </div>
                    <div className="input-group flex-nowrap email row">
                      <span
                        className="input-group-text col-3 col-md-2"
                        id="addon-wrapping"
                      >
                        📧
                      </span>
                      <input
                        type="email"
                        className="form-control col-9 col-md-10"
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
                        className="input-group-text col-3 col-md-2"
                        id="addon-wrapping"
                      >
                        <img
                          src="https://img.icons8.com/ios-filled/50/000000/password-window.png"
                          height="20px"
                          alt="password"
                        />
                      </span>
                      <input
                        type="password"
                        className="form-control col-9 col-md-10"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="addon-wrapping"
                        required
                        onChange={(event) =>
                          this.setState({ password: event.target.value })
                        }
                      ></input>
                    </div>
                    <div className="input-group flex-nowrap phone row">
                      <span
                        className="input-group-text col-3 col-md-2"
                        id="addon-wrapping"
                      >
                        <img
                          src="https://img.icons8.com/ios-filled/50/000000/duplicate-contacts.png"
                          height="20px"
                          alt="phone"
                        />
                      </span>
                      <input
                        type="text"
                        className="form-control col-9 col-md-10"
                        placeholder="PhoneNumber"
                        aria-label="PhoneNumber"
                        aria-describedby="addon-wrapping"
                        minLength="10"
                        maxLength="10"
                        required
                        onChange={(event) =>
                          this.setState({ phone: event.target.value })
                        }
                      ></input>
                    </div>
                    <div className="errormessage">{this.state.error}</div>
                    <button
                      type="submit"
                      data-toggle="button"
                      aria-pressed="false"
                      autoComplete="off"
                      className=" btn btn-success btn-lg"
                    >
                      Sign Up
                    </button>
                  </form>
                ) : regMsg.length === 0 ? (
                  <form id="otpSubmitform" onSubmit={this.handleSubmitOTP}>
                    <div>MEMBER SIGN UP</div>
                    <div className="input-group flex-nowrap row email">
                      <input
                        type="text"
                        className="form-control col-12 col-md-8"
                        placeholder="Enter the OTP sent to the mail"
                        aria-label="OTP"
                        aria-describedby="addon-wrapping"
                        required
                        onChange={(event) =>
                          this.setState({ otp: event.target.value })
                        }
                      ></input>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        type="submit"
                        data-toggle="button"
                        aria-pressed="false"
                        autoComplete="off"
                        className=" btn btn-success btn-md"
                        style={{ margin: "5px" }}
                      >
                        Submit OTP
                      </button>
                    </div>
                  </form>
                ) : (
                  <>{regMsg}</>
                )}
                <div className="loginbtndiv">
                  <Link className="linkLogin" to="/">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
