import React, { Component } from "react";
import Pizza from "../images/customizepizza.jpg";
class CheeseAndSauce extends Component {
  state = {
    cheese: this.props.cheese,
    sauce: this.props.sauce,
    total: this.props.total,
    cheesePrice: {
      mozarella: 0,
      cottage: 15,
      paramesan: 25,
      cheddar: 35,
      feta: 35,
    },
    saucePrice: {
      pesto: 0,
      garlicranch: 15,
      creamybechamel: 20,
      whitegarlic: 25,
      marina: 35,
    },
  };

  render() {
    const { onNextToppings, onBackCrust } = this.props;
    return (
      <div className="col-12 contentCustomize">
        <div className="row cheeseandsauceheaders">
          <div className="col-3 crustandsizehead ">Crust and Size</div>
          <div className="col-3 cheeseandsaucehead active">
            Cheese and Sauce
          </div>
          <div className="col-3 toppingshead ">Toppings</div>
          <div className="col-3 confirmhead">Confirm</div>
        </div>
        <div
          className="row cheeseandsaucecontent"
          style={{ paddingTop: "10px" }}
        >
          <div className="col-6 col-md-3 col-lg-3 col-xl-3 cheeseselectdiv">
            <h1>Cheese</h1>
            <select
              className="form-select cheeseselect"
              size="5"
              aria-label="size 5 select example"
              onChange={(event) =>
                this.setState({
                  cheese: event.target.value,
                  total:
                    this.state.total +
                    this.state.cheesePrice[event.target.value],
                })
              }
            >
              <option value="mozarella">Mozzarella</option>
              <option value="cottage">Cottage</option>
              <option value="paramesan">Parmesan</option>
              <option value="cheddar">Cheddar</option>
              <option value="feta">Feta</option>
            </select>
            <div
              className="selectedCheese"
              style={{ fontSize: "25px", fontWeight: "normal" }}
            >
              Cheese Selected : {this.state.cheese}
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-5 col-xl-6 pizzaimage">
            <div className="row">
              <div className="col-4">
                <hr
                  style={{
                    borderTop: "5px dashed white",
                  }}
                />
              </div>
              <div className="col-4">select</div>
              <div className="col-4">
                <hr
                  style={{
                    borderTop: "5px dashed white",
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">Cheese And Sauce</div>
            </div>
            <div className="row" style={{ margin: "15px" }}>
              <div className=" col-12">
                <img
                  className="customizepizzaimg"
                  src={Pizza}
                  alt="pizza"
                ></img>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-5 col-lg-4 col-xl-3 sizeselectdiv">
            <h1>Sauce</h1>
            <select
              className="form-select sizeselect"
              size="5"
              aria-label="size 5 select example"
              onChange={(event) =>
                this.setState({
                  sauce: event.target.value,
                  total:
                    this.state.total +
                    this.state.saucePrice[event.target.value],
                })
              }
            >
              <option value="pesto">Pesto</option>
              <option value="garlicranch">Garlic Ranch</option>
              <option value="creamybechamel">Creamy Bechamel</option>
              <option value="whitegarlic">White Garlic</option>
              <option value="marina">Marinara</option>
            </select>
            <div className="sauceSelected">
              Sauce Selected: {this.state.sauce}
            </div>
          </div>
        </div>
        <div className="row priceCheeseAndSauce">
          <div className="col-12">Total: {this.state.total}</div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-outline-info back"
              onClick={() =>
                onBackCrust(
                  this.state.total,
                  this.state.cheese,
                  this.state.sauce
                )
              }
            >
              ← Back
            </button>
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-outline-info next"
              onClick={() =>
                onNextToppings(
                  this.state.total,
                  this.state.cheese,
                  this.state.sauce
                )
              }
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CheeseAndSauce;
