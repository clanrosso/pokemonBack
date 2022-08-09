import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import App from "./App";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";

configure({ adapter: new Adapter() });

describe("<App />", () => {
  let store;
  const routes = ["/", "/home", "/home/:id", "/pokemon"];
  const mockStore = configureStore([thunk]);
  const state = {
    allPokemons: [],
    pokemonsToRender: [],
    pokemonDetail: {},
    allTypes: [],
  };

  beforeEach(() => {
    store = mockStore(state);
  });

  const componentToUse = (route) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };

  describe("Cada componente debe ser renderizado en cada ruta", () => {
    it('El componente "Landing" se debería renderizar en la ruta "/"', () => {
      const app = mount(componentToUse(routes[0]));
      expect(app.find(Landing)).toHaveLength(1);
    });

    it('El componente "Home" se debería renderizar solamente en la ruta "/home"', () => {
      const app = mount(componentToUse(routes[1]));
      expect(app.find(Home)).toHaveLength(1);
    });

    it('El componente "PokemonDetail" se debería renderizar solamente en la ruta "/home/:id"', () => {
      const app = mount(componentToUse(routes[2]));
      expect(app.find(PokemonDetail)).toHaveLength(1);
    });

    it('El componente "CreatePokemon" se debería renderizar solamente en la ruta "/pokemon"', () => {
      const app = mount(componentToUse(routes[3]));
      expect(app.find(CreatePokemon)).toHaveLength(1);
    });
  });

  describe("Cada componente NO debe ser renderizado en otra ruta", () => {
    it('No renderizar en la ruta "/"', () => {
      const app = mount(componentToUse(routes[0]));
      expect(app.find(Home)).toHaveLength(0);
      expect(app.find(PokemonDetail)).toHaveLength(0);
      expect(app.find(CreatePokemon)).toHaveLength(0);
    });

    it('No renderizar en la ruta "/home"', () => {
      const app = mount(componentToUse(routes[1]));
      expect(app.find(Landing)).toHaveLength(0);
      expect(app.find(PokemonDetail)).toHaveLength(0);
      expect(app.find(CreatePokemon)).toHaveLength(0);
    });

    it('No renderizar en la ruta "/home/:id"', () => {
      const app = mount(componentToUse(routes[2]));
      expect(app.find(Landing)).toHaveLength(0);
      expect(app.find(Home)).toHaveLength(0);
      expect(app.find(CreatePokemon)).toHaveLength(0);
    });

    it('No renderizar en la ruta "/pokemon"', () => {
      const app = mount(componentToUse(routes[3]));
      expect(app.find(Landing)).toHaveLength(0);
      expect(app.find(Home)).toHaveLength(0);
      expect(app.find(PokemonDetail)).toHaveLength(0);
    });
  });
});
