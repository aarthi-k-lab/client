import React, { Component } from "react";
import Pizza from "../images/customizepizza.jpg";
class Toppings extends Component {
  state = {
    meat: this.props.meat,
    nonmeat: this.props.nonmeat,
    total: this.props.total,
  };

  onTriggerMeat = (event) => {
    let meatVal = event.target.value;
    let newmeat = [],
      meat = [];
    if (this.state.meat.includes(meatVal)) {
      if (this.state.meat.length > 1) {
        this.setState({ total: this.state.total - 50 });
      }
      let index = this.state.meat.indexOf(meatVal);
      meat = this.state.meat;
      meat.splice(index, 1);
      this.setState({ meat: meat });
    } else {
      if (this.state.meat.length >= 1) {
        this.setState({ total: this.state.total + 50 });
      }
      newmeat = [...this.state.meat, meatVal];
      this.setState({ meat: newmeat });
    }
  };

  onTriggerNonMeat = (event) => {
    let nonmeatVal = event.target.value;
    let newnonmeat = [],
      nonmeat = [];
    if (this.state.nonmeat.includes(nonmeatVal)) {
      if (this.state.nonmeat.length > 3) {
        this.setState({ total: this.state.total - 50 });
      }
      let index = this.state.nonmeat.indexOf(nonmeatVal);
      nonmeat = this.state.nonmeat;
      nonmeat.splice(index, 1);
      this.setState({ nonmeat: nonmeat });
    } else {
      if (this.state.nonmeat.length >= 3) {
        this.setState({ total: this.state.total + 50 });
      }
      newnonmeat = [...this.state.nonmeat, nonmeatVal];
      this.setState({ nonmeat: newnonmeat });
    }
  };

  render() {
    const { onBackCheese, onNextConfirm } = this.props;
    return (
      <div className="col-12 contentCustomize">
        <div className="row toppingsheaders">
          <div className="col-3 crustandsizehead ">Crust and Size</div>
          <div className="col-3 cheeseandsaucehead ">Cheese and Sauce</div>
          <div className="col-3 toppingshead active">Toppings</div>
          <div className="col-3 confirmhead">Confirm</div>
        </div>
        <div className="row toppingscontent" style={{ paddingTop: "10px" }}>
          <div
            className="col-6 col-md-3 col-lg-4 col-xl-3 meatselectdiv"
            style={{ textAlign: "left" }}
          >
            <h1>Meat</h1>
            <div className="meatCheck" style={{ padding: "10px" }}>
              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="pepperoni"
                  value="pepperoni"
                  checked={this.state.meat.includes("pepperoni")}
                  onChange={(event) => this.onTriggerMeat(event)}
                />
                <label className="form-check-label" htmlFor="pepperoni">
                  Pepperoni
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="sausage"
                  value="sausage"
                  checked={this.state.meat.includes("sausage")}
                  onChange={(event) => this.onTriggerMeat(event)}
                />
                <label className="form-check-label" htmlFor="sausage">
                  Sausage
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="grilledchicken"
                  value="grilledchicken"
                  checked={this.state.meat.includes("grilledchicken")}
                  onChange={(event) => this.onTriggerMeat(event)}
                />
                <label className="form-check-label" htmlFor="grilledchicken">
                  Grilled chicken
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="pastrami"
                  value="pastrami"
                  checked={this.state.meat.includes("pastrami")}
                  onChange={(event) => this.onTriggerMeat(event)}
                />
                <label className="form-check-label" htmlFor="pastrami">
                  Pastrami
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="salami"
                  value="salami"
                  checked={this.state.meat.includes("salami")}
                  onChange={(event) => this.onTriggerMeat(event)}
                />
                <label className="form-check-label" htmlFor="salami">
                  Spicy Italian salami
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gorgonzola"
                  value="gorgonzola"
                  checked={this.state.meat.includes("gorgonzola")}
                  onChange={(event) => this.onTriggerMeat(event)}
                />
                <label className="form-check-label" htmlFor="gorgonzola">
                  Gorgonzola
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="bacon"
                  value="bacon"
                  checked={this.state.meat.includes("bacon")}
                  onChange={(event) => this.onTriggerMeat(event)}
                />
                <label className="form-check-label" htmlFor="gorgonzola">
                  Bacon
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="ham"
                  value="ham"
                  checked={this.state.meat.includes("ham")}
                  onChange={(event) => this.onTriggerMeat(event)}
                />
                <label className="form-check-label" htmlFor="ham">
                  Ham
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="steak"
                  value="steak"
                  checked={this.state.meat.includes("steak")}
                  onChange={(event) => this.onTriggerMeat(event)}
                />
                <label className="form-check-label" htmlFor="steak">
                  Philly Steak
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="italiansausage"
                  value="italiansausage"
                  checked={this.state.meat.includes("italiansausage")}
                  onChange={(event) => this.onTriggerMeat(event)}
                />
                <label className="form-check-label" htmlFor="italiansausage">
                  Sliced Italian Sausage
                </label>
              </div>
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
              <div className="col-12">Toppings</div>
            </div>
            <div className="row">
              <div className="col-12">
                Choose 3 free non meat and 1 free meat. On adding extra veggies
                and meat, extra charge of Rs. 50 will be applied
              </div>
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

          <div
            className="col-6 col-md-5 col-lg-3 col-xl-3 nonmeatselectdiv"
            style={{ textAlign: "left" }}
          >
            <h1>non meat</h1>
            <div className="nonmeatCheck" style={{ padding: "10px" }}>
              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="paneer"
                  value="paneer"
                  checked={this.state.nonmeat.includes("paneer")}
                  onChange={(event) => this.onTriggerNonMeat(event)}
                />
                <label className="form-check-label" htmlFor="paneer">
                  Paneer
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="babycorn"
                  value="babycorn"
                  checked={this.state.nonmeat.includes("babycorn")}
                  onChange={(event) => this.onTriggerNonMeat(event)}
                />
                <label className="form-check-label" htmlFor="babycorn">
                  American Corn
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="mushrooms"
                  value="mushrooms"
                  checked={this.state.nonmeat.includes("mushrooms")}
                  onChange={(event) => this.onTriggerNonMeat(event)}
                />
                <label className="form-check-label" htmlFor="mushrooms">
                  Mushrooms
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="onions"
                  value="onions"
                  checked={this.state.nonmeat.includes("onions")}
                  onChange={(event) => this.onTriggerNonMeat(event)}
                />
                <label className="form-check-label" htmlFor="onions">
                  Onions
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="redpeppers"
                  value="redpeppers"
                  checked={this.state.nonmeat.includes("redpeppers")}
                  onChange={(event) => this.onTriggerNonMeat(event)}
                />
                <label className="form-check-label" htmlFor="redpeppers">
                  Roasted Red Peppers
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="blackolives"
                  value="blackolives"
                  checked={this.state.nonmeat.includes("blackolives")}
                  onChange={(event) => this.onTriggerNonMeat(event)}
                />
                <label className="form-check-label" htmlFor="blackolives">
                  Black Olives
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="greenpeppers"
                  value="greenpeppers"
                  checked={this.state.nonmeat.includes("greenpeppers")}
                  onChange={(event) => this.onTriggerNonMeat(event)}
                />
                <label className="form-check-label" htmlFor="greenpeppers">
                  Green Peppers
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="spinach"
                  value="spinach"
                  checked={this.state.nonmeat.includes("spinach")}
                  onChange={(event) => this.onTriggerNonMeat(event)}
                />
                <label className="form-check-label" htmlFor="spinach">
                  Spinach
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="freshgarlic"
                  value="freshgarlic"
                  checked={this.state.nonmeat.includes("freshgarlic")}
                  onChange={(event) => this.onTriggerNonMeat(event)}
                />
                <label className="form-check-label" htmlFor="freshgarlic">
                  Fresh Garlic
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="jalapeno"
                  value="jalapeno"
                  checked={this.state.nonmeat.includes("jalapeno")}
                  onChange={(event) => this.onTriggerNonMeat(event)}
                />
                <label className="form-check-label" htmlFor="jalapeno">
                  Jalapeno
                </label>
              </div>

              <div className="col-12">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="tomato"
                  value="tomato"
                  checked={this.state.nonmeat.includes("tomato")}
                  onChange={(event) => this.onTriggerNonMeat(event)}
                />
                <label className="form-check-label" htmlFor="tomato">
                  Fresh Tomato
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row priceToppings">
          <div className="col-12">Total: {this.state.total}</div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-outline-info back"
              onClick={() =>
                onBackCheese(
                  this.state.total,
                  this.state.meat,
                  this.state.nonmeat
                )
              }
            >
              Back ←
            </button>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-outline-info next"
                onClick={() =>
                  onNextConfirm(
                    this.state.total,
                    this.state.meat,
                    this.state.nonmeat
                  )
                }
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Toppings;
