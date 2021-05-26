import React, { Component } from "react";
class OtherMenu extends Component {
  state = {};
  render() {
    const { item, onAddCart } = this.props;
    return (
      <div
        className="pizzacard card col-12 col-md-4"
        style={{ margin: "15px 0px" }}
      >
        <img src={item.image} className="card-img-top" alt={item.name} />
        <div className="card-body">
          <h3 className="card-title" style={{ height: "55px" }}>
            {item.name}
          </h3>
          <p className="pizzacardtext card-text" style={{ height: "60px" }}>
            {item.description}
          </p>

          <br />
          <h3 className="col-12">
            Price: {item.price === undefined ? "" : item.price}
          </h3>
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onAddCart(item.image, item.name, item.price, false)}
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  }
}

export default OtherMenu;
