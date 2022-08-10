const { Router } = require("express");
const axios = require("axios");
// Importo los modelos de la base de datos
const { Pokemon, Tipo } = require("../db");
// Importo las funciones que necesito
const {
  PokemonsFromApi,
  PokemonFromDB,
  oneFromApi,
  oneFromDB,
  validation,
} = require("./functions");

// Ejecuto Router
const router = Router();

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
      // Sino, lo busco en la Api, si lo encuentro lo retorno
      else {
        const selectedPokemonApi = await oneFromApi(name.toLowerCase());
        if (selectedPokemonApi) return res.status(200).send(selectedPokemonApi);
        else {
          // Si no lo encuentro respondo esto...
          res
            .status(200)
            .send("El nombre ingresado no corresponde a ningun Pokemon");
        }
      }
    } else {
      // Si no me pasaron nombre por query, busco y retorno todos los pokemon
      const pokemonsApi40 = await PokemonsFromApi();
      const allPokemons = pokemonsApi40.concat(pokemonsDB);
      res.status(200).send(allPokemons);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Hubo un problema con la busqueda");
  }
});

// Si recibo un idPokemon por params los busco y lo retorno
router.get("/pokemons/:idPokemon", async (req, res) => {
  try {
    const { idPokemon } = req.params;
    // Traigo los Pokemon de la DB
    const pokemonsDB = await PokemonFromDB();

    // Busco en la DB, si lo encuentro lo retorno
    const selectedPokemonDB = await oneFromDB(idPokemon, "ID", pokemonsDB);
    if (selectedPokemonDB) return res.status(200).send(selectedPokemonDB);
    else {
      // Sino, lo busco en la Api, si lo encuentro lo retorno
      const selectedPokemonApi = await oneFromApi(idPokemon);
      if (selectedPokemonApi) return res.status(200).send(selectedPokemonApi);
      else {
        // Si no lo encuentro respondo esto...
        res.status(404).send("El ID ingresado no corresponde a ningun Pokemon");
      }
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

  // Busco si existe otro pokemon con ese nombre
  const pokemonsDB = await PokemonFromDB();
  const pokemonsApi40 = await PokemonsFromApi();
  const allPokemons = pokemonsApi40.concat(pokemonsDB);
  const selectedPokemon = allPokemons.find((p) => p.name === name);
  // Hago todas la validaciones con la funcion importada
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
  // Si existe otro pokemon con ese nombre...
  if (selectedPokemon) {
    return res.status(200).send("Ya existe un pokemon con ese nombre");
    // Sino...
  }
  // Si obtengo algun mensaje de error de validacion lo envío
  else if (error) {
    return res.status(404).send(error);
    // Sino...
  } else {
    try {
      // Creo el nuevo pokemon
      const newPokemon = await Pokemon.create({
        name: name.toLowerCase(),
        image,
        height,
        weight,
        hp,
        attack,
        defense,
        speed,
      });

      // Busco en la DB los tipos de pokemon que coincidan
      // con los tipos que me pasaron por body (puede ser uno solo, o un array)
      const tipoDB = await Tipo.findAll({
        where: {
          name: tipo,
        },
      });

      // Le agrego al nuevo pokemon los tipos (quedan vinculados en la tabla intermedia)
      newPokemon.addTipo(tipoDB);
      return res.status(201).json("Pokemon creado con exito");
    } catch (err) {
      console.log(err);
      return res.status(404).send("Error en alguno de los datos provistos");
    }
  }
});

// Voy a traer todos los tipos de pokemon
router.get("/types", async (req, res) => {
  try {
    // Busco los tipos en la DB, si lo encuentro lo retorno
    const tiposDB = await Tipo.findAll();

    if (tiposDB.length > 0) return res.status(200).send(tiposDB);
    else {
      // Sino busco los tipos en la API
      const tiposFromApi = await axios.get("https://pokeapi.co/api/v2/type");
      const tiposApiFinal = tiposFromApi.data.results;
      // Creo un tipo en la DB por cada tipo de la API
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
