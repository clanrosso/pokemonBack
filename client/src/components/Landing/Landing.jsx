import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import Button from "react-bootstrap/Button";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="internoLanding">
          <h1 className="titleLanding">The amazing Pokeworld!</h1>
          <Link to="/home">
            <button className="buttonLanding" type="submit">
              INGRESAR
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;
