// Importa las actions types que necesites acá:
import {
  GET_ALL_P0KEMONS,
  FILTER_BY_TYPE,
  FILTER_CREATED,
  GET_ALL_TYPES,
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

    case FILTER_CREATED:
      let pokemonsToRender = [];
      if (action.payload === "api") {
        console.log("api");
        pokemonsToRender = state.allPokemons.filter((p) => !p.inDataBase);
      } else if (action.payload === "db") {
        console.log("db");
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

    case GET_ALL_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
