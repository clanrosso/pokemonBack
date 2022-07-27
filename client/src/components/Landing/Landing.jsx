import React, { Component } from "react";
import { Link } from "react-router-dom";
//import "./Landing.css"

// CLASS COMPONENT!
class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <h1>El maravilloso mundo de Pokemon</h1>
        <Link to="/home">Ingresar</Link>
      </div>
    );
  }
}

export default Landing;
