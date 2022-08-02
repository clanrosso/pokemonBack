import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import { Link } from "react-router-dom";

//  FUNCTIONAL COMPONENT!

const PokemonDetail = (props) => {
  // Ejecuto el useDispatch para poder dispachar una accion de redux
  const dispatch = useDispatch();
  const id = props.match.params.id;

  // Al montarse el componente voy a mandar una accion para traer todos los datos del pokemon
  // cuyo id fue pasado por params
  React.useEffect(() => {
    dispatch(getPokemonById(id));
  }, [dispatch, id]);

  // Traigo los datos del pokemon seleccinado desde el estado de redux
  const pokemonDetail = useSelector((state) => state.pokemonDetail);

  // Los pokemon de la Api traen un array type ej: [tipo1, tipo2]
  // Los pokemon de la DB traen un array con tipos ej: [{name:tipo1}, {name:tipo2}]
  // Hago este array para unificarlos
  var typeArray = [];
  // Del array de objetos saco el valor de la propiedad name de cada objeto
  if (pokemonDetail.tipos) {
    pokemonDetail.tipos.forEach((t) => {
      typeArray.push(t.name);
    });
  }
  // Si trae un array type lo paso derecho
  if (pokemonDetail.type) typeArray = pokemonDetail.type;
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
    <div>
      {pokemonDetail.name ? (
        <h1>{`Nombre: ${
          pokemonDetail.name[0].toUpperCase() + pokemonDetail.name.slice(1)
        }`}</h1>
      ) : (
        <h2>Buscando Pokemon seleccionado </h2>
      )}

      {pokemonDetail.image ? (
        <img
          src={pokemonDetail.image}
          alt="Imagen no encontrada"
          width="300px"
          height="350px"
        />
      ) : (
        <h4>Cargando imagen del pokemon...</h4>
      )}

      {pokemonDetail.hp ? (
        <>
          <h4>{`Tipo: ${typeString}`}</h4>
          <h4>{`Altura: ${pokemonDetail.height}`}</h4>
          <h4>{`Peso: ${pokemonDetail.weight}`}</h4>
          <h4>{`Vida: ${pokemonDetail.hp}`}</h4>
          <h4>{`Ataque: ${pokemonDetail.attack}`}</h4>
          <h4>{`Defensa: ${pokemonDetail.defense}`}</h4>
          <h4>{`Velocidad: ${pokemonDetail.speed}`}</h4>
        </>
      ) : (
        <h4>Cargando datos del pokemon...</h4>
      )}

      <Link to={"/home"}>
        <button>Volver</button>
      </Link>
    </div>
  );
};

export default PokemonDetail;