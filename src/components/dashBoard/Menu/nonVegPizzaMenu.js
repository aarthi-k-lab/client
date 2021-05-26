import React, { Component } from "react";
import Pizza from "./pizza.js";
class NonVegPizzaMenu extends Component {
  state = { nonvegpizzamenu: [{}] };

  componentDidMount = async () => {
    try {
      const nonvegpizzamenuurl =
        "https://thawing-ridge-74415.herokuapp.com/api/nonvegpizzamenu";
      const nonvegpizamenures = await fetch(nonvegpizzamenuurl);
      const nonvegpizzamenu = await nonvegpizamenures.json();
      this.setState({ nonvegpizzamenu });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { onAddCart } = this.props;
    return (
      <div className="row nonvegmenucontent">
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
          Non-Veg Pizza Menu
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
          {this.state.nonvegpizzamenu.map((pizza, index) => (
            <Pizza key={index} pizza={pizza} onAddCart={onAddCart} />
          ))}
        </div>
      </div>
    );
  }
}

export default NonVegPizzaMenu;
