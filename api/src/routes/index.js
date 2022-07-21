const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Tipo } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const fromApi = async () => {
  const fromApi20 = await axios.get("https://pokeapi.co/api/v2/pokemon");
  const fromApi40 = await axios.get(fromApi20.data.next);
  const pokemonsApi1 = fromApi20.data.results;
  const pokemonsApi = pokemonsApi1.concat(fromApi40.data.results);

  const pokemonsApiFinal = await Promise.all(
    pokemonsApi.map(async (p) => {
      let subRequest = await axios.get(p.url);
      return {
        name: p.name,
        image: subRequest.data.sprites.other.home.front_default,
        type: subRequest.data.types.map((t) => t.type.name),
      };
    })
  );
  return pokemonsApiFinal;
};

const fromDB = async () => {
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
};

const oneFromApi = async (arg) => {
  try {
    const selectedPokemonApi = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${arg}`
    );
    if (selectedPokemonApi) {
      const selectedPokemon = {
        name: selectedPokemonApi.data.forms[0].name,
        image: selectedPokemonApi.data.sprites.other.home.front_default,
        type: selectedPokemonApi.data.types.map((t) => t.type.name),
      };
      return selectedPokemon;
    }
  } catch (err) {
    return null;
  }
};

router.get("/pokemons", async (req, res) => {
  try {
    const pokemonsDB = await fromDB();
    const { name } = req.query;
    if (name) {
      const selectedPokemonDB = pokemonsDB.find((p) => {
        p.name.toLowerCase() === name.toLowerCase();
      });
      if (selectedPokemonDB) return res.status(200).send(selectedPokemonDB);
      else {
        const selectedPokemonApi = await oneFromApi(name.toLowerCase());
        if (selectedPokemonApi) return res.status(200).send(selectedPokemonApi);
        else {
          res
            .status(404)
            .send("El nombre ingresado con corresponde a ningun Pokemon");
        }
      }
    } else {
      const pokemonsApiFinal = await fromApi();
      const allPokemons = pokemonsApiFinal.concat(pokemonsDB);
      res.status(200).send(allPokemons);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/pokemons/:idPokemon", async (req, res) => {
  try {
    const { idPokemon } = req.params;
    const pokemonsDB = await fromDB();

    const selectedPokemonDB = pokemonsDB.find((p) => {
      p.ID === idPokemon;
    });
    if (selectedPokemonDB) return res.status(200).send(selectedPokemonDB);
    else {
      const selectedPokemonApi = await oneFromApi(idPokemon);
      if (selectedPokemonApi) return res.status(200).send(selectedPokemonApi);
      else {
        res
          .status(404)
          .send("El ID ingresado con corresponde a ningun Pokemon");
      }
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
