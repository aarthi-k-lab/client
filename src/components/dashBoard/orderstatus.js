import React, { Component } from "react";
import ItemStatus from "./itemstatus";
import "alertifyjs/build/css/alertify.css";
import alertify from "alertifyjs";
class OrderStatus extends Component {
  state = { users: [{}] };
  componentDidMount = async () => {
    let token = localStorage.getItem("token");
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

      if (userData.error === undefined) {
        this.setState({ users: userData });
      } else {
        this.setState({ forbiddenState: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleOrderStatus = async (user, item, status) => {
    try {
      let orderItems = user.orderItems;
      let index = orderItems.indexOf(item);
      orderItems[index].status = status;

      let newuser = {
        role: user.role,
        cartItems: user.cartItems,
        orderItems: orderItems,
        username: user.username,
        email: user.email,
        password: user.password,
        phone: user.phone,
      };

      const userapiurl =
        "https://thawing-ridge-74415.herokuapp.com/api/users/" + user._id;
      const userres = await fetch(userapiurl, {
        method: "PUT",
        body: JSON.stringify(newuser),
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      });
      const userdata = await userres.json();
      this.props.onChangeStatus(userdata);
      alertify.success("Order status changed successfully");
    } catch (err) {
      alertify.error(
        "There is some problem while trying to change status of the order. Please try again later"
      );
      console.log(err);
    }
  };
  render() {
    return (
      <div className="row orderStatus">
        {this.state.users ? (
          this.state.users.map((user, index1) => {
            return (
              <ul className="col-12">
                {user.orderItems ? (
                  user.orderItems.map((item, index2) => {
                    return (
                      <ItemStatus
                        key={index1 + "" + index2}
                        item={item}
                        user={user}
                        onChangeOrderStatus={this.handleOrderStatus}
                      />
                    );
                  })
                ) : (
                  <></>
                )}
              </ul>
            );
          })
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default OrderStatus;
