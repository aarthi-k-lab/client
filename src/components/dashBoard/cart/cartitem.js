import React, { Component } from "react";
import "alertifyjs/build/css/alertify.css";

import alertify from "alertifyjs";
class CartItem extends Component {
  state = {
    flag: false,
    viewFlag: false,
    addressFlag: false,
    deliveryAddress: "",
  };
  render() {
    const { item, onToggle, onDelete, onOrder } = this.props;
    return (
      <>
        {this.state.viewFlag === false ? (
          <li className="item row">
            <div className="col-2 col-md-1">
              <input
                className="form-check-input checkinput"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                onClick={() => {
                  onToggle(item, this.state.flag === true ? false : true);
                  this.setState({
                    flag: this.state.flag === true ? false : true,
                  });
                }}
              />
            </div>
            <div className="itemImage col-10  col-lg-3">
              <img src={item.image} alt={item.name} height="100px" />
            </div>
            <div className="itemname col-6 col-md-9 col-lg-6">
              {item.name}: Rs. {item.price}
            </div>

            <div
              className="itembutton col-6 col-md-3 col-lg-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <button
                type="button"
                onClick={() => this.setState({ viewFlag: true })}
              >
                <img
                  src="https://img.icons8.com/wired/64/000000/view-file.png"
                  alt="view"
                  height="25px"
                />
              </button>
              <button type="button" onClick={() => onDelete(item)}>
                <img
                  src="https://img.icons8.com/fluent/48/000000/delete-sign.png"
                  alt="delete"
                  height="25px"
                />
              </button>
            </div>
          </li>
        ) : (
          <div className="row viewdetail">
            <div className="col-12">
              <div className="row">
                <div className="col-4">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => this.setState({ viewFlag: false })}
                  >
                    <img
                      src="https://img.icons8.com/ios-glyphs/30/000000/macos-minimize.png"
                      alt="minimize"
                    />
                  </button>
                </div>
                <div className="col-8" style={{ textAlign: "left" }}>
                  <h1>{item.name}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {this.state.addressFlag === false ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="addressDiv">
                      <span className="input-group-text">
                        Enter the delivery Address
                      </span>
                      <textarea
                        className="form-control"
                        aria-label="With textarea"
                        required
                        onChange={(event) =>
                          this.setState({ deliveryAddress: event.target.value })
                        }
                      ></textarea>
                    </div>
                  )}
                </div>
              </div>

              {item.customized === true ? (
                <div className="customized row">
                  <div className="col-12">
                    Crust: {item.customizedData.crust}
                  </div>
                  <div className="col-12">Size: {item.customizedData.size}</div>
                  <div className="col-12">
                    Cheese: {item.customizedData.cheese}
                  </div>
                  <div className="col-12">
                    Sauce: {item.customizedData.sauce}
                  </div>
                  <div className="col-12">
                    Meat Toopings:{" "}
                    {item.customizedData.meat > 0
                      ? item.customizedData.meat.join(",")
                      : "No meat selected"}
                  </div>
                  <div className="col-12">
                    Nonmeat Toopings:{" "}
                    {item.customizedData.nonmeat.length > 0
                      ? item.customizedData.nonmeat.join(",")
                      : "No nonmeat selected"}
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="row">
                <div className="col-12">
                  <h3>Price: {item.price}</h3>
                </div>
              </div>
              {this.state.addressFlag === false ? (
                <div className="row">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => this.setState({ addressFlag: true })}
                    >
                      Order Now
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        onDelete(item);
                        this.setState({ viewFlag: false });
                      }}
                    >
                      Delete from cart
                    </button>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => this.setState({ addressFlag: false })}
                    >
                      ← Back
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={() => {
                        if (this.state.deliveryAddress === "") {
                          alertify.error("Address cannot be empty");
                        } else onOrder(item, this.state.deliveryAddress);
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default CartItem;
