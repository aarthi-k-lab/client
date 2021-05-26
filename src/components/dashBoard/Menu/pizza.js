import React, { Component } from "react";
class Pizza extends Component {
  state = { size: "Medium", crust: "New Hand Tossed" };
  render() {
    const { pizza, onAddCart } = this.props;
    return (
      <div
        className="pizzacard card col-12 col-md-4"
        style={{ margin: "15px 0px" }}
      >
        <img src={pizza.image} className="card-img-top" alt={pizza.name} />
        <div className="card-body">
          <h3 className="card-title" style={{ height: "55px" }}>
            {pizza.name}
          </h3>
          <p className="pizzacardtext card-text" style={{ height: "60px" }}>
            {pizza.description}
          </p>
          <div className="dropdown row">
            <div className="col-6 size">
              <div className="row-size">Size</div>
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                defaultValue="Medium"
                onChange={(event) =>
                  this.setState({ size: event.target.value })
                }
              >
                <option value="Regular">Regular</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            <div className="col-6 crust">
              <div className="row-size">Crust</div>
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                onChange={(event) =>
                  this.setState({ crust: event.target.value })
                }
              >
                {pizza.price !== undefined ? (
                  Object.keys(pizza.price).map((size, ind) =>
                    size === this.state.size ? (
                      Object.keys(pizza.price[size]).map((crust, index) =>
                        pizza.price[size][crust] !== 0 ? (
                          <option key={pizza.name + index + ind} value={crust}>
                            {crust}
                          </option>
                        ) : (
                          <></>
                        )
                      )
                    ) : (
                      <></>
                    )
                  )
                ) : (
                  <></>
                )}
              </select>
            </div>
          </div>
          <br />
          <h3 className="col-12">
            Price:{" "}
            {pizza.price === undefined
              ? ""
              : pizza.price[this.state.size][this.state.crust]}
          </h3>
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              onAddCart(
                pizza.image,
                pizza.name,
                pizza.price[this.state.size][this.state.crust],
                false
              )
            }
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  }
}

export default Pizza;
