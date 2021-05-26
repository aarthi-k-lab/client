import React, { Component } from "react";

import CrustAndSize from "../customizepizza/crustAndSize";
import CheeseAndSauce from "../customizepizza/cheeseAndSauce";
import Toppings from "../customizepizza/toppings";
import Confirm from "../customizepizza/confirm";

class CustomizePizza extends Component {
  state = {
    crustAndSizeFlag: true,
    cheeseAndSauceFlag: false,
    toppingsFlag: false,
    total: 110,
    crust: "regular",
    size: "regular",
    cheese: "mozarella",
    sauce: "pesto",
    meat: [],
    nonmeat: [],
  };

  gotoBackCrustAndSizePage = (total, cheese, sauce) => {
    this.setState({
      crustAndSizeFlag: true,
      cheeseAndSauceFlag: false,
      toppingsFlag: false,
      total: total,
      cheese: cheese,
      sauce: sauce,
    });
  };

  gotoNextCheeseAndSaucePage = (total, crust, size) => {
    this.setState({
      crustAndSizeFlag: false,
      cheeseAndSauceFlag: true,
      toppingsFlag: false,
      total: total,
      crust: crust,
      size: size,
    });
  };

  gotoNextToppingsPage = (total, cheese, sauce) => {
    this.setState({
      crustAndSizeFlag: false,
      cheeseAndSauceFlag: false,
      toppingsFlag: true,
      total: total,
      cheese: cheese,
      sauce: sauce,
    });
  };

  gotoBackCheeseAndSaucePage = (total, meat, nonmeat) => {
    this.setState({
      crustAndSizeFlag: false,
      cheeseAndSauceFlag: true,
      toppingsFlag: false,
      total: total,
      meat: meat,
      nonmeat: nonmeat,
    });
  };

  goToConfirmationPage = (total, meat, nonmeat) => {
    this.setState({
      crustAndSizeFlag: false,
      cheeseAndSauceFlag: false,
      toppingsFlag: false,
      total: total,
      meat: meat,
      nonmeat: nonmeat,
    });
  };

  goToBackToppingsPage = () => {
    this.setState({
      crustAndSizeFlag: false,
      cheeseAndSauceFlag: false,
      toppingsFlag: true,
    });
  };

  render() {
    const { onAddCart, user, onError } = this.props;
    return (
      <div className="row customizepizzaContent">
        <div className="col-12">
          <div className="row">
            <div className="col-2 col-md-4" style={{ paddingTop: "15px" }}>
              <hr
                style={{
                  borderTop: "5px dashed white",
                }}
              />
            </div>
            <div
              className="col-8 col-md-4"
              style={{
                paddingTop: "15px",
              }}
            >
              <h1>Build your own pizza</h1>
            </div>
            <div className="col-2 col-md-4" style={{ paddingTop: "15px" }}>
              <hr
                style={{
                  borderTop: "5px dashed white",
                }}
              />
            </div>
            {this.state.crustAndSizeFlag === true ? (
              <CrustAndSize
                onNextCrust={this.gotoNextCheeseAndSaucePage}
                crust={this.state.crust}
                size={this.state.size}
                total={this.state.total}
              />
            ) : this.state.cheeseAndSauceFlag === true ? (
              <CheeseAndSauce
                total={this.state.total}
                onNextToppings={this.gotoNextToppingsPage}
                onBackCrust={this.gotoBackCrustAndSizePage}
                cheese={this.state.cheese}
                sauce={this.state.sauce}
              />
            ) : this.state.toppingsFlag === true ? (
              <Toppings
                onBackCheese={this.gotoBackCheeseAndSaucePage}
                total={this.state.total}
                meat={this.state.meat}
                nonmeat={this.state.nonmeat}
                onNextConfirm={this.goToConfirmationPage}
              />
            ) : (
              <Confirm
                onBackTopping={this.goToBackToppingsPage}
                crust={this.state.crust}
                size={this.state.size}
                meat={this.state.meat}
                nonmeat={this.state.nonmeat}
                cheese={this.state.cheese}
                sauce={this.state.sauce}
                total={this.state.total}
                onAddCart={onAddCart}
                user={user}
                onError={onError}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CustomizePizza;
