// Importa las actions types que necesites acá:
import {
  GET_ALL_P0KEMONS,
  FILTER_BY_TYPE,
  FILTER_CREATED,
  GET_ALL_TYPES,
  ORDER,
  GET_POKEMON_BY_NAME,
  CREATE_POKEMON,
} from "../actions/index";

const initialState = {
  allPokemons: [],
  pokemonsToRender: [],
  pokemonDetail: {},
  allTypes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_P0KEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        pokemonsToRender: action.payload,
      };

    case GET_POKEMON_BY_NAME:
      const pokemonToRender = [];
      if (
        action.payload === "El nombre ingresado no corresponde a ningun Pokemon"
      ) {
        return alert("El nombre ingresado no corresponde a ningun Pokemon");
      } else {
        pokemonToRender.push(action.payload);
        return {
          ...state,
          pokemonsToRender: pokemonToRender,
        };
      }

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

    case ORDER:
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

    case GET_ALL_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };

    case CREATE_POKEMON:
      console.log(action.payload);
      return;

    default:
      return state;
  }
};

export default rootReducer;
