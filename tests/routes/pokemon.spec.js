/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);

describe("Pokemon routes", () => {
  conn
    .authenticate()
    .then(conn.sync({ force: true }))
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  describe("GET/pokemons", () => {
    it("should return status 200 ", () => {
      try {
        agent
          .get("/pokemons")
          .then((response) => response.statusCode.should.equal(200))
          .catch(() => done());
      } catch (error) {
        done();
      }
    });

    it("should return status 200 ", () => {
      try {
        agent
          .get("/pokemons?name=Venusaur")
          .then((response) => response.statusCode.should.equal(200))
          .catch(() => done());
      } catch (error) {
        done();
      }
    });

    it("should return status message ", () => {
      try {
        agent
          .get("/pokemons?name=totoro")
          .then((response) =>
            response.text.toBe(
              "El nombre ingresado no corresponde a ningun Pokemon"
            )
          )
          .catch(() => done());
      } catch (error) {
        done();
      }
    });
  });

  describe("GET/pokemons/idPokemon", () => {
    it("should return status 200 ", () => {
      try {
        agent
          .get("/pokemons/2")
          .then((response) => response.statusCode.should.equal(200))
          .catch(() => done());
      } catch (error) {
        done();
      }
    });

    it("should return status message ", () => {
      try {
        agent
          .get("/pokemons/222222")
          .then((response) =>
            response.text.toBe(
              "El ID ingresado no corresponde a ningun Pokemon"
            )
          )
          .catch(() => done());
      } catch (error) {
        done();
      }
    });
  });

  describe("GET/types", () => {
    it("should return status 200 ", () => {
      try {
        agent
          .get("/types")
          .then((response) => response.statusCode.should.equal(200))
          .catch(() => done());
      } catch (error) {
        done();
      }
    });
  });

  describe("POST/pokemons", () => {
    it("should return status 404 ", () => {
      try {
        agent
          .post("/pokemons")
          .then((response) => response.statusCode.should.equal(404))
          .catch(() => done());
      } catch (error) {
        done();
      }
    });

    it("should return status 201 ", () => {
      try {
        agent
          .post("/pokemons")
          .send({ name: "Pepe", attack: 80 })
          .then((response) => response.statusCode.should.equal(201))
          .catch(() => done());
      } catch (error) {
        done();
      }
    });
  });
});

/* it("should return status 200 ", async () => {
      try {
        const res = await agent.get("/pokemons");
        expect(res.statusCode).toBe(200);
      } catch (error) {
        done();
      }
    });*/
