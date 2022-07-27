import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import {
  getAllPokemons,
  filterByType,
  filterCreated,
  getAllTypes,
} from "../../redux/actions/index";
import PokemonCard from "../PokemonCard/PokemonCard";
import Paginado from "../Paginado/Paginado";

//  CLASS COMPONENT!

const Home = () => {
  const dispatch = useDispatch();
  const pokemonsToRender = useSelector((state) => state.pokemonsToRender);
  const allTypes = useSelector((state) => state.allTypes);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pokemonsPerPage] = React.useState(12);

  const lastPokemon = currentPage * pokemonsPerPage;
  const firstPokemon = lastPokemon - pokemonsPerPage;

  const pokemonsFinal = pokemonsToRender.slice(firstPokemon, lastPokemon);

  React.useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, [dispatch]);

  const changePage = (arg) => {
    setCurrentPage(arg);
  };

  const chargeAgain = (event) => {
    event.preventDefault();
    dispatch(getAllPokemons());
  };

  const filterApiOrDb = (event) => {
    event.preventDefault();
    dispatch(filterCreated(event.target.value));
    setCurrentPage(1);
  };

  const filterType = (event) => {
    event.preventDefault();
    dispatch(filterByType(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <Link to={`/pokemon`}>Crear un nuevo Pokemon</Link>
      <h1>Vive el mundo Pokemon</h1>
      <button onClick={(e) => chargeAgain(e)}>
        Volver a cargar todos los pokemon
      </button>
      <div>
        <select onChange={(e) => filterApiOrDb(e)}>
          <option value="all">Todos los Pokemons</option>
          <option value="db">Pokemons creados</option>
          <option value="api">Pokemons existentes</option>
        </select>
        <select onChange={(e) => filterType(e)}>
          <option value="all">Todos los Pokemons</option>
          {allTypes &&
            allTypes.map((t) => {
              return <option value={t.name}>{t.name}</option>;
            })}
        </select>
        <select>
          <option value="asc-alfabet">De la A a la Z</option>
          <option value="desc-alfabet">De la Z a la A</option>
        </select>
        <select>
          <option value="asc-attack">Los mas fuertes</option>
          <option value="desc-attack">Los mas debiles</option>
        </select>
      </div>
      <Paginado
        allPokemons={pokemonsToRender.length}
        pokemonsPerPage={pokemonsPerPage}
        changePage={changePage}
      />

      {console.log(pokemonsFinal)}
      {pokemonsFinal &&
        pokemonsFinal.map((p) => {
          return (
            <>
              <Link to={"/home/" + p.ID}>
                <PokemonCard
                  key={p.ID}
                  name={p.name}
                  image={p.image}
                  type={p.type}
                  tipos={p.tipos}
                  inDataBase={p.inDataBase}
                />
              </Link>
            </>
          );
        })}
    </div>
  );
};

export default Home;