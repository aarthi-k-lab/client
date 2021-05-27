import React, { Component } from "react";

// import alertify from "../../alertifyjs/alertify.js";

// import "../../alertifyjs/css/alertify.css";

import "alertifyjs/build/css/alertify.css";

import alertify from "alertifyjs";
class Confirm extends Component {
  state = { pizzaname: "" };

  onTrigger = async (event) => {
    this.props.onAddCart(
      this.state.pizzaname,
      "https://www.recipetineats.com/wp-content/uploads/2020/05/Pizza-Toppings.jpg?w=500&h=500&crop=1",
      this.props.total,
      true,
      this.props.crust,
      this.props.size,
      this.props.cheese,
      this.props.sauce,
      this.props.meat,
      this.props.nonmeat
    );
    event.preventDefault();
  };

  handleAddCartCustomized = async () => {
    if (this.state.pizzaname === "") {
      alertify.error("Pizza name cannot be empty");
    } else {
      let cartData = {
        name: this.state.pizzaname,
        image:
          "https://www.recipetineats.com/wp-content/uploads/2020/05/Pizza-Toppings.jpg?w=500&h=500&crop=1",
        price: this.props.total,
        customized: true,
        customizedData: {
          crust: this.props.crust,
          size: this.props.size,
          cheese: this.props.cheese,
          sauce: this.props.sauce,
          meat: this.props.meat,
          nonmeat: this.props.nonmeat,
        },
      };
      let user = this.props.user;
      let newcartdata = [...user.cartItems, cartData];

      let newuser = {
        role: user.role,
        cartItems: newcartdata,
        orderItems: user.orderItems,
        username: user.username,
        email: user.email,
        password: user.password,
        phone: user.phone,
      };
      try {
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
        if (userdata.error === undefined) {
          const cartLength = userdata.cartItems.length;
          this.props.onAddCart(userdata, cartLength);
          alertify.success("Item added to cart successfully");
        } else {
          this.props.onError();
        }
      } catch (err) {
        console.log(err);
        alertify.error(
          "There is some problem while trying to add item to the cart please try again later"
        );
      }
    }
  };

  render() {
    const { onBackTopping, crust, size, cheese, sauce, meat, nonmeat, total } =
      this.props;
    return (
      <div className="col-12 contentCustomize">
        <div className="row confirmheaders">
          <div className="col-3 crustandsizehead ">Crust and Size</div>
          <div className="col-3 cheeseandsaucehead ">Cheese and Sauce</div>
          <div className="col-3 toppingshead ">Toppings</div>
          <div className="col-3 confirmhead active">Confirm</div>
        </div>

        <div className="row">
          <div className="col-12 pizzasummary">
            <div className="row" style={{ paddingTop: "15px" }}>
              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-outline-info back"
                  onClick={() => onBackTopping()}
                >
                  ← Back
                </button>
              </div>
              <div className="col-12 col-md-6 crustsizecheesesauce">
                <div className="row centerdis">
                  <div className="col-6">Crust: </div>
                  <div className="col-6">{crust}</div>
                </div>
                <div className="row centerdis">
                  <div className="col-6">Size: </div>
                  <div className="col-6">{size}</div>
                </div>
                <div className="row centerdis">
                  <div className="col-6">Cheese: </div>
                  <div className="col-6">{cheese}</div>
                </div>
                <div className="row centerdis">
                  <div className="col-6">Sauce: </div>
                  <div className="col-6">{sauce}</div>
                </div>
                <br></br>
                <div
                  style={{
                    overflow: "scroll",
                    marginBottom: "15px",
                    padding: "20px",
                    backgroundColor: "rgba(255, 255, 255, .15)",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  <div className="row centerdis">
                    <div className="col-6">Meat: </div>
                    <div className="col-6">
                      {meat.length > 0 ? meat.join(",") : "No meat selected"}
                    </div>
                  </div>
                  <div className="row centerdis">
                    <div className="col-6">Non meat: </div>
                    <div className="col-6">
                      {nonmeat.length > 0
                        ? nonmeat.join(",")
                        : "No non meat selected"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6" style={{ marginBottom: "15px" }}>
                Total: Rs. {total}
              </div>
              <div className="col-7">
                {/* <form onSubmit={this.onTrigger}> */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a unique name for your pizza"
                  aria-label="pizzaname"
                  aria-describedby="basic-addon1"
                  style={{ marginBottom: "15px" }}
                  onChange={(event) =>
                    this.setState({ pizzaname: event.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="btn btn-success confirm next"
                  onClick={() => this.handleAddCartCustomized()}
                >
                  Confirm and Add to Cart
                </button>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
