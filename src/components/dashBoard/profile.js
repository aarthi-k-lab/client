import React, { Component } from "react";
class Profile extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <div className="row profile">
        {/* <div className="col-12"> */}

        {/* </div> */}
        <div className="col-12 card-header league-board">
          <h1>Profile</h1>
        </div>
        <div className="col-12 card-body user-profile-details">
          <div className="gravatar-wrap">
            <img
              src="https://i.pinimg.com/474x/96/b9/22/96b92295619ef8e7a4fb7b24185ca3e6.jpg"
              alt="pizzauser"
            />
          </div>
          <div
            className="personalInfo"
            style={{
              display: "inline-block",
              backgroundColor: "rgba(255, 255, 255, .04)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h4>
              Name: {user.username}
              <br />
              Email Id: {user.email}
              <br />
              Phone number: {user.phone}
              <br />
              Role: {user.role}
              <br />
              Total Order: {user.orderItems ? user.orderItems.length : ""}
              <br />
              Cart Items: {user.cartItems ? user.cartItems.length : ""}
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
