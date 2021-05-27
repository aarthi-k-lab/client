import React, { Component } from "react";
import CartItem from "./cartitem.js";

import "alertifyjs/build/css/alertify.css";
import alertify from "alertifyjs";
class CartItems extends Component {
  state = { selectedItems: [], deliveryAddress: "", deliveryFlag: false };
  handleToggle = (item, checkValue) => {
    if (checkValue === true) {
      let selectedItems = [...this.state.selectedItems, item];
      this.setState({ selectedItems });
    } else {
      let index = this.state.selectedItems.indexOf(item);
      let selectedItems = this.state.selectedItems;
      selectedItems.splice(index, 1);
      this.setState({ selectedItems });
    }
  };
  render() {
    const { user, onDelete, onDeleteSelected, onOrder, onOrderSelected } =
      this.props;
    return (
      <div className="row cartItems">
        <div
          className="col-12"
          style={{
            backgroundColor: "rgba(255, 255, 255, .04)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="row">
            <h1 className="col-12">Cart Items</h1>
          </div>

          <div className="row items">
            <ul className="col-12">
              {user.cartItems !== undefined
                ? user.cartItems.length > 0 && user.cartitems !== null
                  ? user.cartItems.map((item, index) => (
                      <CartItem
                        key={index}
                        item={item}
                        onToggle={this.handleToggle}
                        onDelete={onDelete}
                        onOrder={onOrder}
                      />
                    ))
                  : "Cart is empty"
                : ""}
            </ul>
          </div>
          {this.state.deliveryFlag === true ? (
            <div className="row">
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
          ) : (
            <></>
          )}
          {this.state.deliveryFlag === false ? (
            <div className="row" style={{ marginBottom: "15px" }}>
              <div className="col-6">
                <button
                  type="button"
                  className=" btn btn-lg btn-success"
                  onClick={() => this.setState({ deliveryFlag: true })}
                >
                  Buy All Selected Items
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-lg btn-danger"
                  onClick={() => onDeleteSelected(this.state.selectedItems)}
                >
                  Remove All Selected Items from cart
                </button>
              </div>
            </div>
          ) : (
            <div className="row" style={{ marginBottom: "15px" }}>
              <div className="col-6">
                <button
                  type="button"
                  className=" btn btn-lg btn-success"
                  onClick={() => this.setState({ deliveryFlag: false })}
                >
                  ← Back
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-lg btn-danger"
                  onClick={() => {
                    if (this.state.deliveryAddress === "") {
                      alertify.error("Address cannot be empty");
                    } else {
                      onOrderSelected(
                        this.state.selectedItems,
                        this.state.deliveryAddress
                      );
                    }
                  }}
                >
                  Order Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CartItems;
