import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Importo las acciones que voy a usar
import {
  getAllPokemons,
  filterByType,
  filterCreated,
  getAllTypes,
  order,
} from "../../redux/actions/index";
// Importo los componentes que voy a usar
import PokemonCard from "../PokemonCard/PokemonCard";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  // Me traigo todos los pokemones para renderizar desde el estado de redux
  const pokemonsToRender = useSelector((state) => state.pokemonsToRender);
  // Me traigo todos los tipos de pokemones desde el estado de redux
  const allTypes = useSelector((state) => state.allTypes);

  // Creo un estado local con la pagina actual a renderizar
  const [currentPage, setCurrentPage] = React.useState(1);
  // Creo un estado local con la cantidad de pokemons renderizar por pagina
  const [pokemonsPerPage] = React.useState(12);
  // Creo un estado local para saber como van a estar ordenados los pokemons
  const [orderBy, setOrderBy] = React.useState("");

  // Defino al primer y ultimo pokemon a renderizar en cada pagina
  const lastPokemon = currentPage * pokemonsPerPage;
  const firstPokemon = lastPokemon - pokemonsPerPage;
  // Defino el array final de pokemones a renderizar por pagina
  const pokemonsFinal = pokemonsToRender.slice(firstPokemon, lastPokemon);

  // Traigo una imagen por defecto por si algun pokemon creado no tiene imagen propia
  const defectImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMW0cxVHRInlbJZDM-e87igrjnXMoG4AZffA&usqp=CAU";

  // Cuando el componente se monte o actualice voy a dispatchar acciones para pedir,
  // todos los pokemons y todos los tipos
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

  // Con esta funcion voy a distpachar una accion para filtrar entre pokemons
  // existentes en la Api y los creados en DB
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

  // Creo un contador para poner en className de cada card
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
        <div className="cards">
          {pokemonsToRender.length === 0 ? <h1>Cargando Pokemons...</h1> : null}
          {pokemonsFinal ? (
            pokemonsFinal.map((p) => {
              return (
                <div className={"card" + contador++} key={p.name}>
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
                </div>
              );
            })
          ) : (
            <h1 className="cargandoHome">Cargando Pokemons...</h1>
          )}
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
