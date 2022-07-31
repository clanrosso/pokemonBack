import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import { Link } from "react-router-dom";

//  FUNCTIONAL COMPONENT!

const PokemonDetail = (props) => {
  const dispatch = useDispatch();
  console.log(props.match.params.id);

  React.useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
  }, [dispatch]);

  const pokemonDetail = useSelector((state) => state.pokemonDetail);

  var typeStandard = [];
  if (pokemonDetail.tipos) {
    pokemonDetail.tipos.forEach((t) => {
      typeStandard.push(t.name);
    });
  }
  if (pokemonDetail.type) typeStandard = pokemonDetail.type;

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
          <h4>{`Tipo: ${typeStandard}`}</h4>
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
