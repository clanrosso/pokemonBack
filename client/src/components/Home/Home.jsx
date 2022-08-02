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

  const defectImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMW0cxVHRInlbJZDM-e87igrjnXMoG4AZffA&usqp=CAU";

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
    dispatch(getAllTypes());
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

  const handleOrder = (event) => {
    event.preventDefault();
    dispatch(order(event.target.value));
    setCurrentPage(1);
    setOrderBy(event.target.value);
    console.log(orderBy);
  };

  return (
    <div>
      <h1>Vive el mundo Pokemon</h1>
      <div>
        <Link to={`/pokemon`}>
          <button>Crear un nuevo Pokemon</button>
        </Link>
        <button onClick={(e) => chargeAgain(e)}>
          Volver a cargar todos los pokemon
        </button>
      </div>
      <SearchBar />
      <Filter
        filterApiOrDb={filterApiOrDb}
        filterType={filterType}
        handleOrder={handleOrder}
        allTypes={allTypes}
      />

      <div>
        <Paginado
          allPokemons={pokemonsToRender.length}
          pokemonsPerPage={pokemonsPerPage}
          changePage={changePage}
        />

        {pokemonsToRender.length === 0 ? <h1>Cargando Pokemons...</h1> : null}
        {pokemonsFinal ? (
          pokemonsFinal.map((p) => {
            return (
              <>
                <PokemonCard
                  key={p.ID}
                  ID={p.ID}
                  name={p.name}
                  image={p.image ? p.image : defectImage}
                  type={p.type}
                  tipos={p.tipos}
                  inDataBase={p.inDataBase}
                  attack={p.attack}
                />
              </>
            );
          })
        ) : (
          <h1>Cargando Pokemons...</h1>
        )}
        <Paginado
          allPokemons={pokemonsToRender.length}
          pokemonsPerPage={pokemonsPerPage}
          changePage={changePage}
        />
      </div>
    </div>
  );
};

export default Home;
