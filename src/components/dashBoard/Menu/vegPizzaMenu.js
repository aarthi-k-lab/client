import React, { Component } from "react";
import Pizza from "./pizza.js";
class VegPizzaMenu extends Component {
  state = { vegpizzamenu: [{}] };
  componentDidMount = async () => {
    try {
      const vegpizzamenuurl =
        "https://thawing-ridge-74415.herokuapp.com/api/vegpizzamenu";
      const vegpizamenures = await fetch(vegpizzamenuurl);
      const vegpizzamenu = await vegpizamenures.json();
      this.setState({ vegpizzamenu });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { onAddCart } = this.props;
    return (
      <div className="row vegmenucontent">
        <hr
          style={{
            color: "white",
            backgroundColor: "red",
            height: 5,
            width: "100%",
          }}
        />
        <div
          className="col-12"
          style={{
            color: "yellow",
          }}
        >
          Veg Pizza Menu
        </div>
        <hr
          style={{
            color: "white",
            backgroundColor: "green",
            height: 5,
            width: "100%",
          }}
        />
        <div className="row">
          {this.state.vegpizzamenu.map((pizza, index) => (
            <Pizza key={index} pizza={pizza} onAddCart={onAddCart} />
          ))}
        </div>
      </div>
    );
  }
}

export default VegPizzaMenu;
