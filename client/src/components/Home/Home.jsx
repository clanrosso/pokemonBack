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
//import defaultImage from "../../../public/";
import PokemonCard from "../PokemonCard/PokemonCard";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";

//  CLASS COMPONENT!

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
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2VE8f6QaijYjZKD9uJBwKk8kbgc3xE_t2-g&usqp=CAU";

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
      <Link to={`/pokemon`}>Crear un nuevo Pokemon</Link>
      <h1>Vive el mundo Pokemon</h1>
      <button onClick={(e) => chargeAgain(e)}>
        Volver a cargar todos los pokemon
      </button>
      <SearchBar />
      <div>
        <select key="filterApiOrDb" onChange={(e) => filterApiOrDb(e)}>
          <option value="all">Todos los Pokemons</option>
          <option value="db">Pokemons creados</option>
          <option value="api">Pokemons existentes</option>
        </select>
        <select key="filterType" onChange={(e) => filterType(e)}>
          <option value="all">Todos los Pokemons</option>
          {allTypes &&
            allTypes.map((t) => {
              return <option value={t.name}>{t.name}</option>;
            })}
        </select>
        <select key="order_alfabet" onChange={(e) => handleOrder(e)}>
          <option disabled defaultValue>
            Orden por alfabeto
          </option>
          <option value="asc_alfabet">De la A a la Z</option>
          <option value="desc_alfabet">De la Z a la A</option>
        </select>
        <select key="order_attack" onChange={(e) => handleOrder(e)}>
          <option disabled defaultValue>
            Orden ataque
          </option>
          <option value="desc_attack">Los mas fuertes</option>
          <option value="asc_attack">Los mas debiles</option>
        </select>
      </div>
      <Paginado
        allPokemons={pokemonsToRender.length}
        pokemonsPerPage={pokemonsPerPage}
        changePage={changePage}
      />

      {pokemonsFinal ? (
        pokemonsFinal.map((p) => {
          return (
            <>
              <PokemonCard
                key={p.ID}
                ID={p.ID}
                name={p.name}
                image={
                  p.image ? (
                    p.image
                  ) : (
                    <img src={defectImage} alt="Imagen no encontrada" />
                  )
                }
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
  );
};

export default Home;
