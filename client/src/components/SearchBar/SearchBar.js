import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    if (Number.isInteger(Number(e.target.value)))
      return alert("Debes ingresar un texto");
    else setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPokemonByName(name));
    setName("");
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        type="text"
        placeholder="Nombre del pokemon..."
        value={name}
        onChange={(e) => handleChange(e)}
      />
      <input type="submit" value="Buscar" />
    </form>
  );
}
