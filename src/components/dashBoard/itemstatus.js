import React, { Component } from "react";
class ItemStatus extends Component {
  state = {};

  render() {
    const { item, user, onChangeOrderStatus } = this.props;
    return (
      <li className="row itemStatus">
        <div className="col-12  col-lg-4">
          <img src={item.item.image} alt={item.item.name} height="100px" />
        </div>
        <div className="itemname col-12 col-md-6 col-lg-4">
          {item.item.name}: Rs. {item.item.price}
        </div>
        <div className="userInfo col-12 col-md-6 col-lg-4">
          User name: {user.username} <br></br>User number: {user.phone}
        </div>
        <div className="action col-lg-12">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onChangeOrderStatus(user, item, "order received")}
          >
            order received
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => onChangeOrderStatus(user, item, "In the kitchen")}
          >
            In the kitchen
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => onChangeOrderStatus(user, item, "Sent to delivery")}
          >
            Sent to delivery
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => onChangeOrderStatus(user, item, "Delivered")}
          >
            Delivered
          </button>
        </div>
      </li>
    );
  }
}

export default ItemStatus;
