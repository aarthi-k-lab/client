import React, { Component } from "react";
import Pizza from "../images/customizepizza.jpg";
class CrustAndSize extends Component {
  state = {
    crust: this.props.crust,
    size: this.props.size,
    total: this.props.total,
    price: {
      regular: {
        regular: 110,
        wholewheat: 120,
        glutenfree: 130,
        thincrust: 130,
        doubledecker: 160,
      },
      medium: {
        regular: 180,
        wholewheat: 190,
        glutenfree: 200,
        thincrust: 200,
        doubledecker: 250,
      },
      large: {
        regular: 250,
        wholewheat: 260,
        glutenfree: 280,
        thincrust: 280,
        doubledecker: 340,
      },
      extralarge: {
        regular: 320,
        wholewheat: 340,
        glutenfree: 360,
        thincrust: 380,
        doubledecker: 440,
      },
      partypizza: {
        regular: 800,
        wholewheat: 850,
        glutenfree: 880,
        thincrust: 900,
        doubledecker: 1000,
      },
    },
  };

  render() {
    const { onNextCrust } = this.props;
    return (
      <div className="col-12 contentCustomize">
        <div className="row crustandsizeheaders">
          <div className="col-3 crustandsizehead active">Crust and Size</div>
          <div className="col-3 cheeseandsaucehead ">Cheese and Sauce</div>
          <div className="col-3 toppingshead ">Toppings</div>
          <div className="col-3 confirmhead">Confirm</div>
        </div>
        <div className="row crustandsizecontent" style={{ paddingTop: "10px" }}>
          <div className="col-5 col-md-3 col-lg-3 col-xl-3 crustselectdiv">
            <h1>Crust</h1>
            <select
              className="form-select crustselect"
              size="5"
              aria-label="size 5 select example"
              onChange={(event) =>
                this.setState({
                  crust: event.target.value,
                  total: this.state.price[this.state.size][event.target.value],
                })
              }
            >
              <option value="regular">Regular</option>
              <option value="wholewheat">Whole Wheat</option>
              <option value="glutenfree">Gluten Free</option>
              <option value="thincrust">Thin Crust</option>
              <option value="doubledecker">Double Decker</option>
            </select>
            <div
              className="selectedCore"
              style={{ fontSize: "25px", fontWeight: "normal" }}
            >
              Core Selected : {this.state.crust}
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
              <div className="col-12">Crust And Size</div>
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
            <h1>Size</h1>
            <select
              className="form-select sizeselect"
              size="5"
              aria-label="size 5 select example"
              onChange={(event) =>
                this.setState({
                  size: event.target.value,
                  total: this.state.price[event.target.value][this.state.crust],
                })
              }
            >
              <option value="regular">Regular - 4 Piece</option>
              <option value="medium">Medium- 6 Piece</option>
              <option value="large">Large - 8 Piece</option>
              <option value="extralarge">Extra Large- Family</option>
              <option value="partypizza">Party Pizza</option>
            </select>
            <div className="sizeSelected">Size Selected: {this.state.size}</div>
          </div>
        </div>
        <div className="row priceCrustAndSize">
          <div className="col-12">Total: {this.state.total}</div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-outline-info next"
              onClick={() =>
                onNextCrust(this.state.total, this.state.crust, this.state.size)
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

export default CrustAndSize;
