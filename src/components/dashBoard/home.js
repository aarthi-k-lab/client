import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeBoard from "./boards/homeboard.js";
import Menu from "./boards/menu.js";
import CustomizePizza from "./boards/customizepizza.js";
import AboutUs from "./boards/aboutus.js";
import ForbiddenScreen from "./forbiddenScreen.js";
import CartItems from "./cart/cartitems.js";
import pizzerialogo from "./images/pizzerialogo.png";
import OrderHistory from "./orderhistory.js";
import TrackOrder from "./trackorder.js";
import Profile from "./profile.js";
import OrderStatus from "./orderstatus.js";

import "alertifyjs/build/css/alertify.css";
import alertify from "alertifyjs";
import "bootstrap/dist/css/bootstrap.min.css";

// import Cart from "./images/cart.PNG";
// import List from "./images/list.PNG";

import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    forbiddenState: false,
    user: {},
    totalcartItems: 0,
    orderPageFlag: false,
  };

  componentDidMount = async () => {
    let email = localStorage.getItem("email");
    // let password = localStorage.getItem("password");
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
        let user = userData.find((user) => user.email === email);
        this.setState({ user });
        this.setState({ totalcartItems: user.cartItems.length });
      } else {
        this.setState({ forbiddenState: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  changeStatus = (user) => {
    this.setState({ user });
  };

  handleAddCartCustomized = async (user, totalcartItems) => {
    this.setState({ user, totalcartItems });
  };

  handleAddCart = async (image, name, price, customized) => {
    try {
      let cartData = {
        name: name,
        image: image,
        price: price,
        customized: customized,
      };
      let user = this.state.user;

      let newcartdata = [...user.cartItems, cartData];
      let newuser = {
        role: user.role,
        cartItems: newcartdata,
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
      this.setState({ user: userdata });
      this.setState({ totalcartItems: userdata.cartItems.length });
      alertify.success("Item added to cart successfully");
    } catch (err) {
      console.log(err);
      alertify.error(
        "There is some problem while trying to add item to the cart please try again later"
      );
    }
  };

  handleDelete = async (item) => {
    try {
      let user = this.state.user;
      let newcartdata = user.cartItems;
      let index = newcartdata.indexOf(item);
      newcartdata.splice(index, 1);

      let newuser = {
        role: user.role,
        cartItems: newcartdata,
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
      this.setState({ user: userdata });
      this.setState({ totalcartItems: userdata.cartItems.length });
      alertify.success("Item deleted from cart successfully");
    } catch (err) {
      alertify.error(
        "There is some problem while trying to delete item from the cart please try again later"
      );
      console.log(err);
    }
  };

  loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  handleOrder = async (item, deliveryAddress) => {
    const res = await this.loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      let orderdata = {
        amount: item.price,
        receipt: "receipt_" + Math.random().toString(20).substr(2, 5),
      };

      let orderurl = "https://thawing-ridge-74415.herokuapp.com/api/order";
      let orderRes = await fetch(orderurl, {
        method: "POST",
        body: JSON.stringify(orderdata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let orderData = await orderRes.json();

      if (orderData.error === undefined) {
        var component = this;
        var options = {
          key: orderData.key,
          amount: orderData.amount_due,
          currency: orderData.currency,
          name: item.name,
          description: "Pizzeria Transaction",
          image: item.image,
          order_id: orderData.id,
          handler: async function (response) {
            let newcartdata = component.state.user.cartItems;
            let index = newcartdata.indexOf(item);
            newcartdata.splice(index, 1);

            let newOrderData = component.state.user.orderItems;
            if (newOrderData === null) {
              newOrderData = [
                {
                  item: item,
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  status: "pending",
                },
              ];
            } else {
              newOrderData = [
                ...component.state.user.orderItems,
                {
                  item: item,
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  status: "pending",
                },
              ];
            }
            let newuser = {
              role: component.state.user.role,
              cartItems: newcartdata,
              orderItems: newOrderData,
              username: component.state.user.username,
              email: component.state.user.email,
              password: component.state.user.password,
              phone: component.state.user.phone,
            };
            let userapiurl =
              "https://thawing-ridge-74415.herokuapp.com/api/users/" +
              component.state.user._id;
            const userres = await fetch(userapiurl, {
              method: "PUT",
              body: JSON.stringify(newuser),
              headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + localStorage.getItem("token"),
              },
            });
            const userdata = await userres.json();
            component.setState({ user: userdata });
            component.setState({ totalcartItems: userdata.cartItems.length });

            window.location.href = "/";

            alertify.success("Order placed successfully");
          },
          prefill: {
            name: this.state.user.username,
            email: this.state.user.email,
            contact: this.state.user.phone,
          },
          notes: {
            address: deliveryAddress,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
          alertify.error(
            "Payment Failed\nresponse.error.code: " +
              response.error.code +
              "\ndescription: " +
              response.error.description +
              "\nreason: " +
              response.error.reason +
              "\norder_id" +
              response.error.metadata.order_id +
              "\nPayment_id: " +
              response.error.metadata.payment_id
          );
        });
      } else {
        alertify.error(
          "There is some problem while trying to make order Please try again"
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleOrderSelected = async (selectedItems, deliveryAddress) => {
    if (selectedItems.length > 0) {
      const res = await this.loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      let total = 0;
      let names = [];
      let image = selectedItems[0].image;
      for (let index = 0; index < selectedItems.length; index++) {
        let item = selectedItems[index];
        total += item.price;
        names.push(item.name);
      }
      try {
        let orderdata = {
          amount: total,
          receipt: "receipt_" + Math.random().toString(20).substr(2, 5),
        };

        let orderurl = "https://thawing-ridge-74415.herokuapp.com/api/order";
        let orderRes = await fetch(orderurl, {
          method: "POST",
          body: JSON.stringify(orderdata),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let orderData = await orderRes.json();

        if (orderData.error === undefined) {
          var component = this;
          var options = {
            key: orderData.key,
            amount: orderData.amount_due,
            currency: orderData.currency,
            name: names.join(","),
            description: "Pizzeria Transaction",
            image: image,
            order_id: orderData.id,
            handler: async function (response) {
              let newcartdata = component.state.user.cartItems;
              selectedItems.forEach((item) => {
                let index = newcartdata.indexOf(item);
                newcartdata.splice(index, 1);
              });

              let newOrderData = component.state.user.orderItems;
              if (newOrderData === null) {
                newOrderData = [];
                selectedItems.forEach((item) => {
                  newOrderData.push({
                    item: item,
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                    status: "pending",
                  });
                });
              } else {
                newOrderData = component.state.user.orderItems;
                selectedItems.forEach((item) => {
                  newOrderData.push({
                    item: item,
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                    status: "pending",
                  });
                });
              }
              let newuser = {
                role: component.state.user.role,
                cartItems: newcartdata,
                orderItems: newOrderData,
                username: component.state.user.username,
                email: component.state.user.email,
                password: component.state.user.password,
                phone: component.state.user.phone,
              };
              let userapiurl =
                "https://thawing-ridge-74415.herokuapp.com/api/users/" +
                component.state.user._id;
              const userres = await fetch(userapiurl, {
                method: "PUT",
                body: JSON.stringify(newuser),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "bearer " + localStorage.getItem("token"),
                },
              });
              const userdata = await userres.json();
              component.setState({ user: userdata });
              component.setState({ totalcartItems: userdata.cartItems.length });

              window.location.href = "/";

              alertify.success("Order placed successfully");
            },
            prefill: {
              name: this.state.user.username,
              email: this.state.user.email,
              contact: this.state.user.phone,
            },
            notes: {
              address: deliveryAddress,
            },
            theme: {
              color: "#3399cc",
            },
          };

          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
          paymentObject.on("payment.failed", function (response) {
            alertify.error(
              "Payment Failed\nresponse.error.code: " +
                response.error.code +
                "\ndescription: " +
                response.error.description +
                "\nreason: " +
                response.error.reason +
                "\norder_id" +
                response.error.metadata.order_id +
                "\nPayment_id: " +
                response.error.metadata.payment_id
            );
          });
        } else {
          alertify.error(
            "There is some problem while trying to make order Please try again"
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  handleDeleteSelected = async (selectedItems) => {
    try {
      let user = this.state.user;

      let newcartdata = user.cartItems;
      selectedItems.forEach((item) => {
        let index = newcartdata.indexOf(item);
        newcartdata.splice(index, 1);
      });

      let newuser = {
        role: user.role,
        cartItems: newcartdata,
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
      this.setState({ user: userdata });
      this.setState({ totalcartItems: userdata.cartItems.length });
      alertify.success("Item deleted from cart successfully");
    } catch (err) {
      alertify.error(
        "There is some problem while trying to delete item from the cart please try again later"
      );
      console.log(err);
    }
  };

  render() {
    const { onLogOut, onRefresh } = this.props;
    return (
      <>
        {this.state.forbiddenState === false ? (
          <div className="dashboard">
            <div className="home container">
              <Router>
                <div className="row navbarhome">
                  <div className="logo col-12 col-sm-12 col-md-3 col-lg-1 col-xl-1">
                    <img src={pizzerialogo} alt="pizzeria" height="50px"></img>
                  </div>
                  <div className="col-12 col-sm-4 col-md-3 col-lg-5 col-xl-3 navigateLinks1">
                    <div className="row">
                      <Link
                        className="homeLinks col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                        to="/"
                      >
                        Home
                      </Link>
                      <Link
                        className="homeLinks col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                        to="/Menu"
                      >
                        Menu
                      </Link>
                    </div>
                  </div>
                  <div className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-5 navigateLinks">
                    <div className="row">
                      <Link
                        className="homeLinks col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                        to="/customizePizza"
                      >
                        CustomizePizza
                      </Link>
                      <Link
                        className="homeLinks col-6  col-sm-6 col-md-6 col-lg-6 col-xl-6"
                        to="/aboutUs"
                      >
                        About Us
                      </Link>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                    <button
                      type="button"
                      data-toggle="button"
                      aria-pressed="false"
                      autoComplete="off"
                      className="cartBtn btn"
                      style={{ margin: "5px" }}
                      onClick={() => (window.location.href = "/cartItems")}
                    >
                      {/* <img src={Cart} height="50px" alt="cart" /> */}
                      <img
                        src="https://img.icons8.com/pastel-glyph/64/000000/fast-cart.png"
                        height="50px"
                        alt="cart"
                      />
                      <span className="badge bg-secondary">
                        {this.state.totalcartItems}
                      </span>
                    </button>
                    <span className="dropdown">
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropdownMenu2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {/* <img src={List} height="50px" alt="list" /> */}
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/000000/add-list.png"
                          height="50px"
                          alt="list"
                        />
                      </button>

                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenu2"
                      >
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => (window.location.href = "/profile")}
                          >
                            Profile
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() =>
                              (window.location.href = "/trackOrder")
                            }
                          >
                            Track Order
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() =>
                              (window.location.href = "/orderHistory")
                            }
                          >
                            Order History
                          </button>
                        </li>
                        {this.state.user.role === "admin" ? (
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() =>
                                (window.location.href = "/orderStatus")
                              }
                            >
                              Change Order Status
                            </button>
                          </li>
                        ) : (
                          <></>
                        )}
                        <li>
                          <div>
                            <Link
                              to="/"
                              className="dropdown-item"
                              onClick={() => onLogOut()}
                            >
                              LogOut
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </span>
                  </div>
                </div>
                <Switch>
                  <Route path="/" exact>
                    <HomeBoard />
                  </Route>
                  <Route path="/Menu">
                    <Menu onAddCart={this.handleAddCart} />
                  </Route>
                  <Route path="/customizePizza">
                    <CustomizePizza
                      onAddCart={this.handleAddCartCustomized}
                      user={this.state.user}
                      onError={() => this.setState({ forbiddenState: true })}
                    />
                  </Route>
                  <Route path="/aboutUs">
                    <AboutUs />
                  </Route>
                  <Route path="/cartItems">
                    <CartItems
                      user={this.state.user}
                      onDelete={this.handleDelete}
                      onDeleteSelected={this.handleDeleteSelected}
                      onOrderSelected={this.handleOrderSelected}
                      onOrder={this.handleOrder}
                    />
                  </Route>
                  <Route path="/orderHistory">
                    <OrderHistory user={this.state.user} />
                  </Route>
                  <Route path="/trackOrder">
                    <TrackOrder user={this.state.user} />
                  </Route>
                  <Route path="/profile">
                    <Profile user={this.state.user} />
                  </Route>
                  <Route path="/orderStatus">
                    <OrderStatus onChangeStatus={this.changeStatus} />
                  </Route>
                </Switch>
              </Router>
            </div>
          </div>
        ) : (
          <ForbiddenScreen onLogOut={onLogOut} onRefresh={onRefresh} />
        )}
      </>
    );
  }
}

export default Home;
