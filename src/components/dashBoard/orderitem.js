import React, { Component } from "react";
class OrderItem extends Component {
  state = {};
  render() {
    const { item } = this.props;
    return (
      <li className="row orderItem">
        <div className="col-12  col-lg-3">
          <img src={item.item.image} alt={item.item.name} height="100px" />
        </div>
        <div className="itemname col-12 col-md-6 col-lg-5">
          {item.item.name}: Rs. {item.item.price}
        </div>
        <div className="orderId col-12 col-md-6 col-lg-4">
          Order Id: {item.order_id} <br></br>Payment Id: {item.payment_id}
        </div>
      </li>
    );
  }
}

export default OrderItem;
