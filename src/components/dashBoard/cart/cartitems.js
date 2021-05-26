import React, { Component } from "react";
import CartItem from "./cartitem.js";
class CartItems extends Component {
  state = { selectedItems: [] };
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
    const { user, onDelete, onDeleteSelected, onOrder } = this.props;
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
                ? user.cartItems.length > 0
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
          <div className="row" style={{ marginBottom: "15px" }}>
            <div className="col-6">
              <button type="button" className=" btn btn-lg btn-success">
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
        </div>
      </div>
    );
  }
}

export default CartItems;
