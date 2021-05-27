import React, { Component } from "react";
import TrackItem from "./trackitem.js";
class TrackOrder extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <div className="row trackOrder">
        <h1 className="col-12">Track Order</h1>
        {user.orderItems === null || user.orderItems == null ? (
          <div className="col-12">No Order so far</div>
        ) : (
          <div className="col-12">
            {user.orderItems.length === 0 ? (
              "No Order so far"
            ) : (
              <ul>
                {user.orderItems.map((item, index) => (
                  <TrackItem key={index} item={item} />
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default TrackOrder;
