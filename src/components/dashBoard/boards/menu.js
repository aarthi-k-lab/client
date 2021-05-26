import React, { Component } from "react";

import Vegpizza from "../images/boards/vegpizza.PNG";
import Nonvegpizza from "../images/boards/non-vegpizza.PNG";
import Slides from "../images/boards/slidesandothers.PNG";
import Beverages from "../images/boards/beverages.jpg";
import Dessert from "../images/boards/dessert.jpg";

import VegPizzaMenu from "../Menu/vegPizzaMenu";
import NonVegPizzaMenu from "../Menu/nonVegPizzaMenu";
import SlidesAndOthersMenu from "../Menu/slidesandothersMenu";
import BeveragesMenu from "../Menu/beveragesMenu";
import DessertsMenu from "../Menu/dessertsMenu";

class Menu extends Component {
  state = {
    vegPizzaFlag: false,
    nonvegPizzaFlag: false,
    slidesFlag: false,
    beveragesFlag: false,
    dessertsFlag: false,
  };
  render() {
    const { onAddCart } = this.props;
    return (
      <div className="menuboard row">
        <div className="title-menu col-12">
          <div className="row">
            <h1 className="col-12">Explore Menu</h1>
          </div>
        </div>
        <div className="col-12 pizzamenu">
          <div className="row">
            <div className="col-12 col-md-6 vegpizza">
              <button
                type="button"
                className="menuBtn"
                onClick={() => {
                  document.getElementById("menuContent").scrollIntoView();
                  return this.setState({
                    vegPizzaFlag: true,
                    nonvegPizzaFlag: false,
                    slidesFlag: false,
                    beveragesFlag: false,
                    dessertsFlag: false,
                  });
                }}
              >
                <div className="card-menu">
                  <img
                    src={Vegpizza}
                    className="card-img-top"
                    alt="vegPizzza"
                    height="250px"
                  />
                  <div className="card-body">
                    <div className="card-text">Veg Pizza</div>
                  </div>
                </div>
              </button>
            </div>
            <div className="col-12 col-md-6 nonvegpizza">
              <button
                type="button"
                className="menuBtn"
                onClick={() => {
                  document.getElementById("menuContent").scrollIntoView();
                  return this.setState({
                    vegPizzaFlag: false,
                    nonvegPizzaFlag: true,
                    slidesFlag: false,
                    beveragesFlag: false,
                    dessertsFlag: false,
                  });
                }}
              >
                <div className="card-menu">
                  <img
                    src={Nonvegpizza}
                    className="card-img-top"
                    alt="non-vegPizzza"
                    height="250px"
                  />
                  <div className="card-body">
                    <div className="card-text">Non Veg Pizza</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 othermenu">
          <div className="row">
            <div className="col-12 col-md-4 slides">
              <button
                type="button"
                className="menuBtn"
                onClick={() => {
                  document.getElementById("menuContent").scrollIntoView();
                  return this.setState({
                    vegPizzaFlag: false,
                    nonvegPizzaFlag: false,
                    slidesFlag: true,
                    beveragesFlag: false,
                    dessertsFlag: false,
                  });
                }}
              >
                <div className="card-menu">
                  <img
                    src={Slides}
                    className="card-img-top"
                    alt="slidesandothers"
                    height="200px"
                  />
                  <div className="card-body">
                    <div className="card-text">Slides and others</div>
                  </div>
                </div>
              </button>
            </div>
            <div className="col-12 col-md-4 beverages">
              <button
                type="button"
                className="menuBtn"
                onClick={() => {
                  document.getElementById("menuContent").scrollIntoView();
                  return this.setState({
                    vegPizzaFlag: false,
                    nonvegPizzaFlag: false,
                    slidesFlag: false,
                    beveragesFlag: true,
                    dessertsFlag: false,
                  });
                }}
              >
                <div className="card-menu">
                  <img
                    src={Beverages}
                    className="card-img-top"
                    alt="beverages"
                    height="200px"
                  />
                  <div className="card-body">
                    <div className="card-text">Beverages</div>
                  </div>
                </div>
              </button>
            </div>
            <div className="col-12 col-md-4 desserts">
              <button
                type="button"
                className="menuBtn"
                onClick={() => {
                  document.getElementById("menuContent").scrollIntoView();
                  return this.setState({
                    vegPizzaFlag: false,
                    nonvegPizzaFlag: false,
                    slidesFlag: false,
                    beveragesFlag: false,
                    dessertsFlag: true,
                  });
                }}
              >
                <div className="card-menu">
                  <img
                    src={Dessert}
                    className="card-img-top"
                    alt="desserts"
                    height="200px"
                  />
                  <div className="card-body">
                    <div className="card-text">Desserts</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div id="menuContent" className="col-12">
          {this.state.vegPizzaFlag === true ? (
            <VegPizzaMenu onAddCart={onAddCart} />
          ) : this.state.nonvegPizzaFlag === true ? (
            <NonVegPizzaMenu onAddCart={onAddCart} />
          ) : this.state.slidesFlag === true ? (
            <SlidesAndOthersMenu onAddCart={onAddCart} />
          ) : this.state.beveragesFlag === true ? (
            <BeveragesMenu onAddCart={onAddCart} />
          ) : this.state.dessertsFlag === true ? (
            <DessertsMenu onAddCart={onAddCart} />
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

export default Menu;
