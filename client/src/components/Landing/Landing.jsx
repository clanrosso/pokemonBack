import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

// CLASS COMPONENT!
class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="contenido">
          <h1 className="titleLanding">The amazing Pokeworld!</h1>
          <Link to="/home">
            <button className="button">Ingresar</button>{" "}
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;
