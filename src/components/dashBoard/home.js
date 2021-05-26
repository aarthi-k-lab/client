import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeBoard from "./boards/homeboard.js";
import Menu from "./boards/menu.js";
import CustomizePizza from "./boards/customizepizza.js";
import AboutUs from "./boards/aboutus.js";
import ForbiddenScreen from "./forbiddenScreen.js";
import CartItems from "./cart/cartitems.js";

import alertify from "../alertifyjs/alertify.js";

import "../alertifyjs/css/alertify.css";

import "bootstrap/dist/css/bootstrap.min.css";

import pizzerialogo from "./images/pizzerialogo.png";
// import Cart from "./images/cart.PNG";
// import List from "./images/list.PNG";

import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    forbiddenState: false,
    user: {},
    totalcartItems: 0,
    orderConfirm
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

  handleOrder = (item) => {};

  handleDeleteSelected = async (selectedItems) => {
    try {
      let user = this.state.user;

      let newcartdata = user.cartItems;
      selectedItems.map((item) => {
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
                          <button className="dropdown-item" type="button">
                            Profile
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" type="button">
                            Track Order
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" type="button">
                            Order History
                          </button>
                        </li>
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
                      onOrder={this.handleOrder}
                    />
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
