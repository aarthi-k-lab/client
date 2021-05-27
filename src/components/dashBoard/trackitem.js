import React, { Component } from "react";
class TrackItem extends Component {
  state = {};
  render() {
    const { item } = this.props;
    return (
      <li className="row trackItem">
        <div className="col-12  col-lg-6">
          <img src={item.item.image} alt={item.item.name} height="100px" />
        </div>
        <div className="itemname col-12  col-lg-6">
          {item.item.name}
          <br></br>Status: {item.status}
        </div>
      </li>
    );
  }
}

export default TrackItem;
