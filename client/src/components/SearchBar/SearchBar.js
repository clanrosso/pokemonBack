import React, { Component } from "react";
import { connect } from "react-redux";
import { getPokemonByName } from "../../redux/actions";
import "./SearchBar.css";

export class SearchBar extends Component {
  // Creo un estado local name donde voy a guardar el nombre del pokemon buscado

  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  // Con esta funcion manejo el nombre que me ingresan por input
  handleChange = (e) => {
    e.preventDefault();
    if (Number.isInteger(Number(e.target.value))) {
      return alert("Debes ingresar un texto");
    } else {
      this.setState({
        name: e.target.value,
      });
    }
  };

  // Con esta funcion dispatcho la accion para traer el pokemon elegido
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name === "")
      return alert("Debes ingresar el nombre de algun Pokemon");
    console.log(this.state.name);
    this.props.getPokemonByName(this.state.name);
    this.setState({
      name: "",
    });
  };

  render() {
    return (
      <form
        className="searchBar"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <input
          className="inputSearchBar"
          type="text"
          placeholder="Nombre del pokemon..."
          value={this.state.name}
          onChange={(e) => this.handleChange(e)}
        />
        <input className="buttonSearchBar" type="submit" value="Buscar" />
      </form>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getPokemonByName: (name) => dispatch(getPokemonByName(name)),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);

/*import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions";
import "./SearchBar.css";

export default function SearchBar() {
  // Creo un estado local name donde voy a guardar el nombre del pokemon buscado
  const [name, setName] = useState("");
  // Ejecuto useDispatch
  const dispatch = useDispatch();

  // Con esta funcion manejo el nombre que me ingresan por input
  const handleChange = (e) => {
    e.preventDefault();
    // Si me mandan un numero, retorno una alerta
    if (Number.isInteger(Number(e.target.value)))
      return alert("Debes ingresar un texto");
    // Setéo el estado name con el valor que me ingresa por input
    else setName(e.target.value);
  };

  // Con esta funcion dispatcho la accion para traer el pokemon elegido
  const handleSubmit = (e) => {
    e.preventDefault();
    // El name es dato obligatorio, si no está retorno una alerta
    if (name === "") return alert("Debes ingresar el nombre de algun Pokemon");
    dispatch(getPokemonByName(name));
    setName("");
  };
 */
