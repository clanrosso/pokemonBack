import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  getAllPokemons,
  filterByType,
  filterCreated,
  getAllTypes,
  order,
} from "../../redux/actions/index";

import PokemonCard from "../PokemonCard/PokemonCard";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const pokemonsToRender = useSelector((state) => state.pokemonsToRender);
  const allTypes = useSelector((state) => state.allTypes);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pokemonsPerPage] = React.useState(12);
  const [orderBy, setOrderBy] = React.useState("");

  const lastPokemon = currentPage * pokemonsPerPage;
  const firstPokemon = lastPokemon - pokemonsPerPage;
  const pokemonsFinal = pokemonsToRender.slice(firstPokemon, lastPokemon);

  React.useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, [dispatch]);

  // Con esta funsion voy a setear la pagina actual
  const changePage = (arg) => {
    if (arg === null) return;
    setCurrentPage(arg);
  };

  // Con esta funcion voy a voy a hacer los distpach de nuevo
  const chargeAgain = (event) => {
    event.preventDefault();
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  };

  // Con esta funcion voy a distpachar una accion para filtrar entre Api y DB
  const filterApiOrDb = (event) => {
    event.preventDefault();
    dispatch(filterCreated(event.target.value));
    setCurrentPage(1);
  };

  // Con esta funcion voy a distpachar una accion para filtrar los pokemons por tipo
  const filterType = (event) => {
    event.preventDefault();
    dispatch(filterByType(event.target.value));
    setCurrentPage(1);
  };

  // Con esta funcion voy a distpachar una accion para filtrar los pokemons por tipo
  const handleOrder = (event) => {
    event.preventDefault();
    dispatch(order(event.target.value));
    setCurrentPage(1);
    setOrderBy(event.target.value);
    console.log(orderBy);
  };

  let contador = 1;

  return (
    <div className="home">
      <h1 className="titleHome">The amazing Pokeworld!</h1>
      <div className="nav">
        <div className="buttonsHome">
          <Link to={`/pokemon`}>
            <button className="buttonCreate">Crear un nuevo Pokemon</button>
          </Link>
          <button className="buttonRecharge" onClick={(e) => chargeAgain(e)}>
            Volver a cargar todos los pokemon
          </button>
        </div>
        <SearchBar />
      </div>

      <div className="principal">
        {pokemonsToRender.length === 0 ? (
          <h1 className="cargandoHome">Cargando Pokemons...</h1>
        ) : (
          <>
            <Filter
              filterApiOrDb={filterApiOrDb}
              filterType={filterType}
              handleOrder={handleOrder}
              allTypes={allTypes}
            />
            <Paginado
              allPokemons={pokemonsToRender.length}
              pokemonsPerPage={pokemonsPerPage}
              changePage={changePage}
              currentPage={currentPage}
            />
          </>
        )}
        <div className="cards">
          {pokemonsFinal &&
            pokemonsFinal.map((p) => {
              return (
                <div className={"card" + contador++} key={p.name}>
                  <PokemonCard
                    key={p.ID}
                    ID={p.ID}
                    name={p.name}
                    image={p.image}
                    type={p.type}
                    tipos={p.tipos}
                    inDataBase={p.inDataBase}
                    attack={p.attack}
                  />
                </div>
              );
            })}
        </div>
        <Paginado
          allPokemons={pokemonsToRender.length}
          pokemonsPerPage={pokemonsPerPage}
          changePage={changePage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Home;
