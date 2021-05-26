import React, { Component } from "react";
import OtherMenu from "./othermenu.js";
class BeveragesMenu extends Component {
  state = { beveragesmenu: [{}] };

  componentDidMount = async () => {
    try {
      const beveragesmenuurl =
        "https://thawing-ridge-74415.herokuapp.com/api/beveragesmenu";
      const beveragesmenures = await fetch(beveragesmenuurl);
      const beveragesmenu = await beveragesmenures.json();
      this.setState({ beveragesmenu });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { onAddCart } = this.props;
    return (
      <div className="row beveragescontent">
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
          Beverages
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
          {this.state.beveragesmenu.map((item, index) => (
            <OtherMenu key={index} item={item} onAddCart={onAddCart} />
          ))}
        </div>
      </div>
    );
  }
}

export default BeveragesMenu;
