import React, { Component } from "react";
import OtherMenu from "./othermenu.js";
class DessertsMenu extends Component {
  state = { dessertsmenu: [{}] };

  componentDidMount = async () => {
    try {
      const dessertsmenuurl =
        "https://thawing-ridge-74415.herokuapp.com/api/dessertsmenu";
      const dessertsmenures = await fetch(dessertsmenuurl);
      const dessertsmenu = await dessertsmenures.json();
      this.setState({ dessertsmenu });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { onAddCart } = this.props;
    return (
      <div className="row dessertscontent">
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
          Desserts
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
          {this.state.dessertsmenu.map((item, index) => (
            <OtherMenu key={index} item={item} onAddCart={onAddCart} />
          ))}
        </div>
      </div>
    );
  }
}

export default DessertsMenu;
