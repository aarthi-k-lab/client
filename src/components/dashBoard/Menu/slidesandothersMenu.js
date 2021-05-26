import React, { Component } from "react";
import OtherMenu from "./othermenu.js";
class SlidesAndOthersMenu extends Component {
  state = { slidesandothers: [{}] };

  componentDidMount = async () => {
    try {
      const slidesandothersurl =
        "https://thawing-ridge-74415.herokuapp.com/api/sidesmenu";
      const slidesandothersres = await fetch(slidesandothersurl);
      const slidesandothers = await slidesandothersres.json();
      this.setState({ slidesandothers });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { onAddCart } = this.props;
    return (
      <div className="row slidesndothrscontent">
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
          Slides and Others
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
          {this.state.slidesandothers.map((item, index) => (
            <OtherMenu key={index} item={item} onAddCart={onAddCart} />
          ))}
        </div>
      </div>
    );
  }
}

export default SlidesAndOthersMenu;
