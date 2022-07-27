import React from "react";

// FUNCTIONAL COMPONENT!
const PokemonCard = ({ name, type, tipos, image, inDataBase, attack }) => {
  return (
    <div>
      <img
        src={image}
        alt="Imagen no encontrada"
        width="200px"
        height="250px"
      />
      <h1>{`Name: ${name}`}</h1>
      {inDataBase ? (
        <p>{`Tipo: ${tipos.map((t) => {
          return t.name;
        })}`}</p>
      ) : (
        <p>{`Tipo: ${type}`}</p>
      )}
      <p>{`Ataque: ${attack}`}</p>
    </div>
  );
};

export default PokemonCard;
