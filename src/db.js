require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_RENDER, DB_RAILWAY } = process.env;

const sequelize = new Sequelize(
  "postgres://pokemon_ih6v_user:VTp7OjRTmFYNBpoLqbY4Gf9zrPS5kpoh@dpg-ce0dudo2i3mkucct1n30-a.oregon-postgres.render.com/pokemon_ih6v",
  {
    logging: false,
    native: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);
/*
const sequelize = new Sequelize(DB_RAILWAY, {
  logging: false,
  native: false,
});
*/
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
const { Pokemon, Tipo } = sequelize.models;

Pokemon.belongsToMany(Tipo, { through: "pokemon_tipo" });
Tipo.belongsToMany(Pokemon, { through: "pokemon_tipo" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
