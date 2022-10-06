// Importo las actions
import Swal from "sweetalert2";
import {
  GET_ALL_P0KEMONS,
  FILTER_BY_TYPE,
  FILTER_CREATED,
  GET_ALL_TYPES,
  ORDER,
  GET_POKEMON_BY_NAME,
  CREATE_POKEMON,
  GET_POKEMON_BY_ID,
  DELETE_POKEMON_BY_ID,
} from "../actions/index";

// Iniciamos un estado
const initialState = {
  allPokemons: [],
  pokemonsToRender: [],
  pokemonDetail: {},
  allTypes: [],
  data: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Cargo todos los pokemons traidos
    case GET_ALL_P0KEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        pokemonsToRender: action.payload,
        pokemonDetail: {},
        data: true,
      };

    // Cargo nombre buscado en el searchbar
    case GET_POKEMON_BY_NAME:
      const pokemonToRender = [];
      if (
        action.payload === "El nombre ingresado no corresponde a ningun Pokemon"
      ) {
        Swal.fire({
          title: "El nombre ingresado no corresponde a ningun Pokemon",
          background: "#545552",
          color: "#ffd700",
          confirmButtonColor: "#ffd700",
          imageAlt: "Custom image",
          showClass: {
            popup: "animate_animated animate_flipInY",
          },
        });
      } else {
        pokemonToRender.push(action.payload);
        return {
          ...state,
          pokemonsToRender: pokemonToRender,
          data: true,
        };
      }
      return state;

    // Cargo los datos para el detalle del pokemon elegido
    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonDetail: action.payload,
        data: true,
      };

    case FILTER_CREATED:
      let pokemonsToRender = [];

      if (action.payload === "api") {
        pokemonsToRender = state.allPokemons.filter((p) => !p.inDataBase);
      } else if (action.payload === "db") {
        pokemonsToRender = state.allPokemons.filter((p) => p.inDataBase);
      } else {
        pokemonsToRender = state.allPokemons;
      }
      return {
        ...state,
        pokemonsToRender: pokemonsToRender,
      };

    case FILTER_BY_TYPE:
      let pokemonsToRender2 = [];
      if (action.payload === "all") pokemonsToRender2 = state.allPokemons;
      else {
        // Los pokemon de la Api traen un array type ej: [tipo1, tipo2]
        // Los pokemon de la DB traen un array con tipos ej: [{name:tipo1}, {name:tipo2}]
        const pokemonsStandard = state.allPokemons.map((p) => {
          if (p.tipos) {
            p.type = [];
            p.tipos?.forEach((t) => {
              p.type.push(t.name);
            });
            return p;
          } else {
            return p;
          }
        });

        pokemonsToRender2 = pokemonsStandard.filter((p) =>
          p.type?.includes(action.payload)
        );
      }
      return {
        ...state,
        pokemonsToRender: pokemonsToRender2,
      };

    // Voy a cargar en un nuevo array los pokemones ordenados del modo seleccionado
    case ORDER:
      let sortedPokemons = [];
      if (action.payload === "asc_alfabet") {
        sortedPokemons = state.pokemonsToRender.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        });
      } else if (action.payload === "desc_alfabet") {
        sortedPokemons = state.pokemonsToRender.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (b.name > a.name) return 1;
          return 0;
        });
      } else if (action.payload === "asc_attack") {
        sortedPokemons = state.pokemonsToRender.sort((a, b) => {
          if (a.attack > b.attack) return 1;
          if (b.attack > a.attack) return -1;
          return 0;
        });
      } else if (action.payload === "desc_attack") {
        sortedPokemons = state.pokemonsToRender.sort((a, b) => {
          if (a.attack > b.attack) return -1;
          if (b.attack > a.attack) return 1;
          return 0;
        });
      }
      return {
        ...state,
        pokemonsToRender: sortedPokemons,
      };

    // Cargo todos los tipos de pokemons traidos
    case GET_ALL_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };

    // Si el nuevo pokemon fue creado con exito, retorno una alerta
    case CREATE_POKEMON:
      if (action.payload === "Ya existe un pokemon con ese nombre") {
        Swal.fire({
          title: "Ya existe un pokemon con ese nombr",
          background: "#545552",
          color: "#ffd700",
          confirmButtonColor: "#ffd700",
          imageAlt: "Custom image",
          showClass: {
            popup: "animate_animated animate_flipInY",
          },
        });
      } else if (action.payload === "Pokemon creado con exito") {
        Swal.fire({
          title: "Pokemon creado con exito",
          background: "#545552",
          color: "#ffd700",
          confirmButtonColor: "#ffd700",
          imageAlt: "Custom image",
          showClass: {
            popup: "animate_animated animate_flipInY",
          },
        });
      }
      break;

    // Si el pokemon fue elimiado con exito, retorno una alerta
    case DELETE_POKEMON_BY_ID:
      if (action.payload === "El Pokemon fue eliminado con exito") {
        Swal.fire({
          title: "El Pokemon fue eliminado con exito",
          background: "#545552",
          color: "#ffd700",
          confirmButtonColor: "#ffd700",
          imageAlt: "Custom image",
          showClass: {
            popup: "animate_animated animate_flipInY",
          },
        });
      }
      break;

    default:
      return state;
  }
};

export default rootReducer;
