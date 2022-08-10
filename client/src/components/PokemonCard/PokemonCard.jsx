import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePokemonById } from "../../redux/actions";
import "./PokemonCard.css";

// FUNCTIONAL COMPONENT!
const PokemonCard = ({ ID, name, type, tipos, image, attack, inDataBase }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deletePokemonById(ID));
  };
  // Los pokemon de la Api traen un array type ej: [tipo1, tipo2]
  // Los pokemon de la DB traen un array con tipos ej: [{name:tipo1}, {name:tipo2}]
  // Hago este array para unificarlos
  var typeArray = [];
  // Del array de objetos saco el valor de la propiedad name de cada objeto
  if (tipos) {
    tipos.forEach((t) => {
      typeArray.push(t.name);
    });
  }
  // Si trae un array type lo paso derecho
  if (type) typeArray = type;
  //Defino un array para renderizar
  var typeString = " - ";
  // Recorro el array y agrego cada tipo (pongo la primera letra en mayuscula)
  for (let i = 0; i < typeArray.length; i++) {
    typeString =
      typeString +
      typeArray[i][0].toUpperCase() +
      typeArray[i].slice(1) +
      " - ";
  }

  return (
    <div className="card">
      <h1 className="titleCard">{`Nombre: ${
        name[0].toUpperCase() + name.slice(1)
      }`}</h1>
      <img
        className="imageCard"
        src={image}
        alt="Imagen no encontrada"
        width="200px"
        height="250px"
      />
      <div className="dates">
        <h4>{`Ataque: ${attack}`}</h4>
        <h4>{`Tipo: ${typeString}`}</h4>
      </div>
      <div className="buttonsCard">
        <Link to={"/home/" + ID}>
          <button className="buttonCard">Detalle</button>
        </Link>
        {inDataBase && (
          <button onClick={(e) => handleDelete(e)} className="buttonCard">
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
