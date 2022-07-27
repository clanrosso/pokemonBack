import axios from "axios";

export const GET_ALL_P0KEMONS = "GET_ALL_P0KEMONS";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_CREATED = "FILTER_CREATED";
export const GET_ALL_TYPES = "GET_ALL_TYPES";

// el middleware "thunk", nos permite trabajar con acciones asincrónicas.
// Necesitamos hacer uso de este middleware ya que peticiones al back siempre son asincrónicas,
// , necesitamos ese "delay" para despachar nuestra action hasta que la data nos llegue.

// Usar ruta para buscar todos los pokemons en nuestro back.
export const getAllPokemons = () => {
  return function (dispatch) {
    axios("http://localhost:3001/pokemons", {}).then((response) => {
      return dispatch({ type: GET_ALL_P0KEMONS, payload: response.data });
    });
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

// Usar ruta para buscar todos los pokemons en nuestro back.
export const getAllTypes = () => {
  return function (dispatch) {
    axios("http://localhost:3001/types", {}).then((response) => {
      return dispatch({ type: GET_ALL_TYPES, payload: response.data });
    });
  };
};

// Usar ruta para buscar un pokemon por el id pasado
// Donde :id, el id recibido como argumento de la action creator.

/*
export const getPokemon = (id) => {
  return async function (dispatch) {
    let response = await fetch(`http://localhost:3000/houses/${id}`);
    return dispatch({ type: GET_HOUSE, payload: response.json() });
  };
};

/*
// Inicializamos id en 3, para que nuestros próximos ID's no se pisen con los existentes.
// La vas a usar en la funcion createHouse, descomentala cuando te haga falta;
let id = 3;

// Desde el componente ejecutamos la action creator, pasandole como argumento los values que vamos a utilizar para crear la house.
export const createHouse = ({ name, region, words }) => {
  id++;
  return {
    type: CREATE_HOUSE,
    payload: {
      id: id,
      name: name,
      region: region,
      words: words,
    },
  };
};

// Desde el componente ejecutamos la action creator, pasandole como argumento el id de la house que queremos eliminar.
export const deleteHouse = (id) => {
  return {
    type: DELETE_HOUSE,
    payload: id,
  };
};
*/
