import axios from "axios";

export const GET_ALL_P0KEMONS = "GET_ALL_P0KEMONS";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_CREATED = "FILTER_CREATED";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const ORDER = "ORDER";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";

// El middleware "thunk", nos permite trabajar con acciones asincrónicas.
// Necesitamos hacer uso de este middleware ya que las peticiones al back siempre son asincrónicas,
// , necesitamos ese "delay" para dispatchar nuestra action hasta que la data nos llegue.

// Usa ruta para buscar todos los pokemons en nuestro back.
export const getAllPokemons = () => {
  return function (dispatch) {
    try {
      axios("http://localhost:3001/pokemons", {}).then((response) => {
        return dispatch({ type: GET_ALL_P0KEMONS, payload: response.data });
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// Usa ruta para buscar un pokemon por name pasado por query.
export const getPokemonByName = (name) => {
  return function (dispatch) {
    try {
      axios("http://localhost:3001/pokemons?name=" + name, {}).then(
        (response) => {
          return dispatch({
            type: GET_POKEMON_BY_NAME,
            payload: response.data,
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
};

// Usa ruta para buscar un pokemon por id pasado por params.
export const getPokemonById = (id) => {
  return function (dispatch) {
    try {
      console.log(id);
      axios("http://localhost:3001/pokemons/" + id, {}).then((response) => {
        return dispatch({
          type: GET_POKEMON_BY_ID,
          payload: response.data,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// Accion para filtrar los pokemon por tipo
export const filterByType = (payload) => {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
};

// Accion para filtrar los pokemon entre creados y existentes
export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};

// Usa ruta para buscar todos los tipos pokemons en nuestro back.
export const getAllTypes = () => {
  return function (dispatch) {
    try {
      axios("http://localhost:3001/types", {}).then((response) => {
        return dispatch({ type: GET_ALL_TYPES, payload: response.data });
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// Accion para ordenar los pokemon por alfabeto o ataque
export const order = (payload) => {
  return {
    type: ORDER,
    payload,
  };
};

// Usa ruta para crear un nuevo pokemon en nuestra DB.
export const createPokemon = (payload) => {
  return function (dispatch) {
    try {
      axios.post("http://localhost:3001/pokemons", payload).then((response) => {
        return dispatch({
          type: CREATE_POKEMON,
          payload: response.data,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
};

/*
export const getPokemon = (id) => {
  return async function (dispatch) {
    let response = await fetch(`http://localhost:3000/houses/${id}`);
    return dispatch({ type: GET_HOUSE, payload: response.json() });
  };
};
*/
