const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Tipo } = require("../db");
const {
  PokemonsFromApi,
  PokemonFromDB,
  oneFromApi,
  oneFromDB,
  validation,
} = require("./functions");

const router = Router();

// Si recibo un idPokemon por params los busco y lo retorno
router.get("/pokemons/:idPokemon", async (req, res) => {
  try {
    const { idPokemon } = req.params;
    const pokemonsDB = await PokemonFromDB();

    const selectedPokemonDB = await oneFromDB(idPokemon, "ID", pokemonsDB);
    if (selectedPokemonDB) return res.status(200).send(selectedPokemonDB);
    else {
      const selectedPokemonApi = await oneFromApi(idPokemon);
      if (selectedPokemonApi) return res.status(200).send(selectedPokemonApi);
      else {
        res.status(404).send("El ID ingresado no corresponde a ningun Pokemon");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Hubo un problema con la busqueda");
  }
});

// Si recibe un name por query lo busca,
// sino busca y retorna los 40 primeros Pokemon de la API,
// y todos los Pokemon de la DB
router.get("/pokemons", async (req, res) => {
  try {
    // Traigo los Pokemon de la DB
    const pokemonsDB = await PokemonFromDB();
    const { name } = req.query;
    // Si tengo un name lo busco en la DB, si lo encuentro lo retorno
    if (name) {
      const selectedPokemonDB = await oneFromDB(
        name.toLowerCase(),
        "name",
        pokemonsDB
      );
      if (selectedPokemonDB) return res.status(200).send(selectedPokemonDB);
      else {
        const selectedPokemonApi = await oneFromApi(name.toLowerCase());
        if (selectedPokemonApi) return res.status(200).send(selectedPokemonApi);
        else {
          res
            .status(200)
            .send("El nombre ingresado no corresponde a ningun Pokemon");
        }
      }
    } else {
      const pokemonsApi40 = await PokemonsFromApi();
      const allPokemons = pokemonsApi40.concat(pokemonsDB);
      res.status(200).send(allPokemons);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Hubo un problema con la busqueda");
  }
});

// Recibo por body los datos para crear un nuevo pokemon en la DB
router.post("/pokemons", async (req, res) => {
  const { name, image, height, weight, hp, attack, defense, speed, tipo } =
    req.body;

  const pokemonsDB = await PokemonFromDB();
  const pokemonsApi40 = await PokemonsFromApi();
  const allPokemons = pokemonsApi40.concat(pokemonsDB);
  const selectedPokemon = allPokemons.find((p) => p.name === name);

  const error = validation(
    name,
    image,
    height,
    weight,
    hp,
    attack,
    defense,
    speed
  );

  if (selectedPokemon) {
    return res.status(200).send("Ya existe un pokemon con ese nombre");
  } else if (error) {
    return res.status(404).send(error);
  } else {
    try {
      const newPokemon = await Pokemon.create({
        name: name.toLowerCase(),
        image: image
          ? image
          : "https://cdn.dribbble.com/users/1771704/screenshots/14855056/media/87a746f733cc295401cef5dcadf05752.png?compress=1&resize=320x240&vertical=top",
        height,
        weight,
        hp,
        attack,
        defense,
        speed,
      });

      const tipoDB = await Tipo.findAll({
        where: {
          name: tipo,
        },
      });

      newPokemon.addTipo(tipoDB);
      return res.status(201).json("Pokemon creado con exito");
    } catch (err) {
      console.log(err);
      return res.status(404).send("Error en la creación del nuevo Pokemon");
    }
  }
});

// Voy a traer todos los tipos de pokemon
router.get("/types", async (req, res) => {
  try {
    const tiposDB = await Tipo.findAll();

    if (tiposDB.length > 0) return res.status(200).send(tiposDB);
    else {
      const tiposFromApi = await axios.get("https://pokeapi.co/api/v2/type");
      const tiposApiFinal = tiposFromApi.data.results;

      tiposApiFinal.forEach((t) => Tipo.create({ name: t.name }));
      return res.status(201).send(tiposApiFinal);
    }
  } catch (err) {
    console.log(err);
    res.status(404).send("Hubo un error en la busqueda de Tipos de Pokemon");
  }
});

// Si recibo un idPokemon por params lo elimino de la DB
router.delete("/delete/:idPokemon", async (req, res) => {
  try {
    const { idPokemon } = req.params;

    await Pokemon.destroy({
      where: { ID: idPokemon },
    });
    res.status(200).send("El Pokemon fue eliminado con exito");
  } catch (err) {
    console.log(err);
    res.status(400).send("No se pudo eliminar el Pokemon");
  }
});

module.exports = router;
