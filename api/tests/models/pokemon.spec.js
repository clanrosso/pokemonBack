const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("pokemon", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should throw an error if height is not between 0 and 25", (done) => {
        Pokemon.create({ height: 20 })
          .then(() => done(new Error("It requires a value between 0 and 25")))
          .catch(() => done());
      });
      it("should throw an error if weight is not between 0 and 1500", (done) => {
        Pokemon.create({ weight: 1600 })
          .then(() => done(new Error("It requires a value between 0 and 1500")))
          .catch(() => done());
      });
      it("should throw an error if speed is not between 0 and 300", (done) => {
        Pokemon.create({ speed: 305 })
          .then(() => done(new Error("It requires a value between 0 and 300")))
          .catch(() => done());
      });
      it("should throw an error if attack is not between 0 and 300", (done) => {
        Pokemon.create({ attack: 305 })
          .then(() => done(new Error("It requires a value between 0 and 300")))
          .catch(() => done());
      });
      it("should throw an error if defense is not between 0 and 300", (done) => {
        Pokemon.create({ defense: 1000 })
          .then(() => done(new Error("It requires a value between 0 and 300")))
          .catch(() => done());
      });
      it("should throw an error if hp is not between 0 and 300", (done) => {
        Pokemon.create({ hp: -1 })
          .then(() => done(new Error("It requires a value between 0 and 300")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" });
      });
    });
  });
});
