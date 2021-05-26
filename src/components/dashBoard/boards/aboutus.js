import React, { Component } from "react";
import About from "../images/info.jpg";
class AboutUs extends Component {
  state = {};
  render() {
    return (
      <div className="aboutus row">
        <div className="col-12">
          <h1>Welcome to the world of Delicious Pizza</h1>
        </div>
        <div className="col-12">
          <div className="aboutus row">
            <div className="col-12 col-lg-6">
              <img src={About} alt="pizzeria" height="200px"></img>
            </div>
            <div
              className="col-12 col-lg-6 intro"
              style={{
                backgroundColor: "rgba(255, 255, 255, .04)",
                backdropFilter: "blur(10px)",
              }}
            >
              We offer you the best service and the delicious taste you can
              never forget. More than 25 types of custom pizza available and
              also you can create your own customized pizza.
              <br />
              What are you waiting for? Create your own taste and enjoy the art
              of our chefs
            </div>
            <div
              className="col-12"
              style={{
                backgroundColor: "rgba(255, 255, 255, .04)",
                backdropFilter: "blur(10px)",
              }}
            >
              For more details or order related queries contact: 957808833#
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
