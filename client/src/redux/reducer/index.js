// Importo las actions
import {
  GET_ALL_P0KEMONS,
  FILTER_BY_TYPE,
  FILTER_CREATED,
  GET_ALL_TYPES,
  ORDER,
  GET_POKEMON_BY_NAME,
  CREATE_POKEMON,
  GET_POKEMON_BY_ID,
} from "../actions/index";

// Iniciamos un estado
const initialState = {
  // Voy a guardar...
  allPokemons: [], // Copia de todos los pokemons traidos desde el back
  pokemonsToRender: [], // Array de pokemones a renderizar
  pokemonDetail: {}, // Datos del pokemon seleccionado por id, para el detalle
  allTypes: [], // Copia de todos los tipos de pokemons traidos del back
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_P0KEMONS:
      // Cargo todos los pokemons traidos
      return {
        ...state,
        allPokemons: action.payload,
        pokemonsToRender: action.payload,
        pokemonDetail: {},
      };

    case GET_POKEMON_BY_NAME:
      const pokemonToRender = [];

      // Si el nombre de pokemon buscado en el SearchBar no existe, retorno una alerta
      if (
        action.payload === "El nombre ingresado no corresponde a ningun Pokemon"
      ) {
        alert(action.payload);
      } else {
        // Si existe, lo cargo para renderizar
        pokemonToRender.push(action.payload);
        return {
          ...state,
          pokemonsToRender: pokemonToRender,
          pokemonDetail: {},
        };
      }
      return state;

    case GET_POKEMON_BY_ID:
      // Cargo los datos para el detalle del pokemon elegido

      return {
        ...state,
        pokemonDetail: action.payload,
      };

    case FILTER_CREATED:
      let pokemonsToRender = [];
      // Si seleccionan a los pokemons existentes en la API,
      // busco para renderizar solo a los que NO tienen la key inDataBase
      if (action.payload === "api") {
        pokemonsToRender = state.allPokemons.filter((p) => !p.inDataBase);
        // Si seleccionan a los pokemons creados en la DB,
        // busco para renderizar solo a los que SI tienen la key inDataBase
      } else if (action.payload === "db") {
        pokemonsToRender = state.allPokemons.filter((p) => p.inDataBase);
        // Sino, los dejo a todos
      } else {
        pokemonsToRender = state.allPokemons;
      }
      return {
        ...state,
        pokemonsToRender: pokemonsToRender,
      };

    case FILTER_BY_TYPE:
      let pokemonsToRender2 = [];
      // Si seleccionan todos los tipos, renderizo todo
      if (action.payload === "all") pokemonsToRender2 = state.allPokemons;
      //Sino...
      else {
        // Los pokemon de la Api traen un array type ej: [tipo1, tipo2]
        // Los pokemon de la DB traen un array con tipos ej: [{name:tipo1}, {name:tipo2}]
        // Hago este array para unificarlos
        const pokemonsStandard = state.allPokemons.map((p) => {
          if (p.tipos) {
            p.type = [];
            // Si ese pokemon tiene tipos, saco el name de cada objeto
            p.tipos?.forEach((t) => {
              p.type.push(t.name);
            });
            // Sino, lo retorno como viene
            return p;
          } else {
            return p;
          }
        });
        // Busco si el tipo pasado por payload, está incluido en los tipos de cada pokemon
        pokemonsToRender2 = pokemonsStandard.filter((p) =>
          p.type?.includes(action.payload)
        );
      }
      // Modifico el array para renderizar solo con los pokemones filtrados
      return {
        ...state,
        pokemonsToRender: pokemonsToRender2,
      };

    case ORDER:
      // Voy a cargar en un nuevo array los pokemones ordenados del modo seleccionado
      let sortedPokemons = [];
      if (action.payload === "asc_alfabet") {
        sortedPokemons = state.pokemonsToRender.sort((a, b) => {
          if (a.name > b.name) return 1; // b queda a la izquierda
          if (b.name > a.name) return -1; //  a queda a la izquierda
          return 0;
        });
      } else if (action.payload === "desc_alfabet") {
        sortedPokemons = state.pokemonsToRender.sort((a, b) => {
          if (a.name > b.name) return -1; //  a queda a la izquierda
          if (b.name > a.name) return 1; // b queda a la izquierda
          return 0;
        });
      } else if (action.payload === "asc_attack") {
        sortedPokemons = state.pokemonsToRender.sort((a, b) => {
          if (a.attack > b.attack) return 1; // b queda a la izquierda
          if (b.attack > a.attack) return -1; //  a queda a la izquierda
          return 0;
        });
      } else if (action.payload === "desc_attack") {
        sortedPokemons = state.pokemonsToRender.sort((a, b) => {
          if (a.attack > b.attack) return -1; //  a queda a la izquierda
          if (b.attack > a.attack) return 1; // b queda a la izquierda
          return 0;
        });
      }
      return {
        ...state,
        pokemonsToRender: sortedPokemons,
      };

    case GET_ALL_TYPES:
      // Cargo todos los tipos de pokemons traidos
      return {
        ...state,
        allTypes: action.payload,
      };

    case CREATE_POKEMON:
      console.log(action.payload);
      // Si el nuevo pokemon fue creado con exito, retorno una alerta
      if (action.payload === "Ya existe un pokemon con ese nombre") {
        return alert(action.payload);
      } else if (action.payload === "Pokemon creado con exito") {
        return alert(action.payload);
      }

      break;

    default:
      return state;
  }
};

export default rootReducer;
