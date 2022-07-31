import React from "react";
import { Link } from "react-router-dom";

// FUNCTIONAL COMPONENT!
const PokemonCard = ({ ID, name, type, tipos, image, attack }) => {
  var typeStandard = [];
  if (tipos) {
    tipos.forEach((t) => {
      typeStandard.push(t.name);
    });
  }
  if (type) typeStandard = type;

  return (
    <div>
      <h1>{`Nombre: ${name}`}</h1>
      <img
        src={image}
        alt="Imagen no encontrada"
        width="200px"
        height="250px"
      />
      <p>{`Ataque: ${attack}`}</p>
      <h4>{`Tipo: ${typeStandard}`}</h4>
      <Link to={"/home/" + ID}>
        <button>Detalle</button>
      </Link>
    </div>
  );
};

export default PokemonCard;
