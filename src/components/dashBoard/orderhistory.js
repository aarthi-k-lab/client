import React, { Component } from "react";
import OrderItem from "./orderitem.js";
class OrderHistory extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <div className="row orderHistory">
        <h1 className="col-12">Order History</h1>
        {user.orderItems === null || user.orderItems == null ? (
          <div className="col-12">No Order so far</div>
        ) : (
          <div className="col-12">
            {user.orderItems.length === 0 ? (
              "No Order so far"
            ) : (
              <ul>
                {user.orderItems.map((item, index) => (
                  <OrderItem key={index} item={item} />
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default OrderHistory;
