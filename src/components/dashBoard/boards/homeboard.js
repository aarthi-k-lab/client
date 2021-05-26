import React, { Component } from "react";

class HomeBoard extends Component {
  state = {};

  routeChange(path) {
    window.location.href = path;
  }

  render() {
    return (
      <div className="homeboard row">
        <div className=" col-6"></div>
        <div className="col-6">
          <div className="startrow row"></div>
          <div className="row">
            <div className="col-12 homequote">Less Waiting More Eating</div>
          </div>

          <div className="row">
            <div className="col-12 booknowdiv">
              <button
                type="button"
                className="hbBtn btn btn-danger btn-lg "
                data-toggle="button"
                aria-pressed="false"
                autoComplete="off"
                onClick={() => this.routeChange("/Menu")}
              >
                Explore our Menu
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12 customizediv">
              <button
                type="button"
                className="hbBtn btn btn-success btn-lg "
                data-toggle="button"
                aria-pressed="false"
                autoComplete="off"
                onClick={() => this.routeChange("/customizePizza")}
              >
                Customize '' Pizza
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeBoard;
