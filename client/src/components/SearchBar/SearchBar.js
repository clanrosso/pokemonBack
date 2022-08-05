import React, { useState } from "react";
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
    dispatch(getPokemonByName(name));
    setName("");
  };

  return (
    <form
      className="searchBar"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        className="inputSearchBar"
        type="text"
        placeholder="Nombre del pokemon..."
        value={name}
        onChange={(e) => handleChange(e)}
      />
      <input className="buttonSearchBar" type="submit" value="Buscar" />
    </form>
  );
}
