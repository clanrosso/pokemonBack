const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    ID: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0.0,
        max: 25.0,
      },
    },
    weight: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0.0,
        max: 1500.0,
      },
    },
    hp: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 300,
      },
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 300,
      },
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 300,
      },
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 300,
      },
    },
    InDataBase: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
