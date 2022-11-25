const axios = require("axios");
const { Pokemon, Tipo } = require("../db");

// Le paso como argumento un array (va a tener objetos con las estadisticas del pokemon),
// el nombre de una estadistica de pokemon que estoy buscando (hp, speed, defense, attack)
// y una key del objeto que estoy comparando (va a ser "base_stat")
const findStats = (array, nameStat, key) => {
  const selectedStat = array.find((s) => {
    return s.stat.name === nameStat;
  });
  return selectedStat[key];
};

module.exports = {
  // Voy a buscar todos los pokemon a la API
  PokemonsFromApi: async () => {
    const fromApi20 = await axios.get("https://pokeapi.co/api/v2/pokemon"); //20
    const fromApi40 = await axios.get(fromApi20.data.next); //40
    const pokemonsApi1 = fromApi20.data.results;
    const pokemonsApi = pokemonsApi1.concat(fromApi40.data.results);

    const pokemonsApiFinal = await Promise.all(
      pokemonsApi.map(async (p) => {
        let subRequest = await axios.get(p.url);
        const statsArray = subRequest.data.stats;
        return {
          ID: subRequest.data.id,
          name: p.name,
          image: subRequest.data.sprites.other.home.front_default,
          type: subRequest.data.types.map((t) => t.type.name),
          attack: findStats(statsArray, "attack", "base_stat"),
        };
      })
    );
    return pokemonsApiFinal;
  },

  // Voy a buscar todos los pokemon a la DB
  PokemonFromDB: async () => {
    const pokemonsDB = await Pokemon.findAll({
      include: {
        model: Tipo,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return pokemonsDB;
  },

  // Voy a buscar solo un pokemon a las API
  // El argumento puede ser un name o un idPokemon
  oneFromApi: async (arg) => {
    try {
      const selectedPokemonApi = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${arg}`
      );

      if (selectedPokemonApi) {
        const statsArray = selectedPokemonApi.data.stats;
        const images = selectedPokemonApi.data.sprites;
        const selectedPokemon = {
          name: selectedPokemonApi.data.forms[0].name,
          image: images.other.home.front_default,
          type: selectedPokemonApi.data.types.map((t) => t.type.name),
          ID: selectedPokemonApi.data.id,
          height: selectedPokemonApi.data.height,
          weight: selectedPokemonApi.data.weight,
          hp: findStats(statsArray, "hp", "base_stat"),
          attack: findStats(statsArray, "attack", "base_stat"),
          defense: findStats(statsArray, "defense", "base_stat"),
          speed: findStats(statsArray, "speed", "base_stat"),
        };
        return selectedPokemon;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  // Voy a buscar solo un pokemon a las DB
  // El arg va a ser name o idPokemon
  // La key es una propiedad del objeto que estoy comparando (va a ser name o ID)
  // Array tiene objetos con todos los pokemon de la DB (pokemonsDB)
  oneFromDB: async (arg, key, array) => {
    const selectedPokemonDB = array.find((p) => {
      return p[key] === arg;
    });
    return selectedPokemonDB;
  },

  // Esta función va a validar datos en la ruta de post/pokemons
  validation: (name, image, height, weight, hp, attack, defense, speed) => {
    let error = "";

    if (!name) {
      error = "Debes enviar un nombre para el nuevo Pokemon";
    }
    if (Number.isInteger(parseInt(name)) || Number.isInteger(parseInt(image))) {
      error = "Debes ingresar un texto";
    }
    if (
      !Number.isInteger(Number(height)) ||
      !Number.isInteger(Number(weight)) ||
      !Number.isInteger(Number(hp)) ||
      !Number.isInteger(Number(attack)) ||
      !Number.isInteger(Number(defense)) ||
      !Number.isInteger(Number(speed))
    ) {
      error = "Debes ingresar un numero";
    }
    if (
      hp < 0 ||
      hp > 300 ||
      attack < 0 ||
      attack > 300 ||
      defense < 0 ||
      defense > 300 ||
      speed < 0 ||
      speed > 300
    ) {
      error =
        "Vida, ataque, defensa y velocidad deben tener un numero entre 0 y 300";
    }
    if (height < 0 || height > 25) {
      error = "Debes ingresar una altura entre 0 y 25";
    }
    if (weight < 0 || weight > 1500) {
      error = "Debes ingresar un peso entre 0 y 1500";
    }
    if (error) return error;
  },
};
