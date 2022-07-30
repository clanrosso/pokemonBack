// import "./App.css";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/home/:id" component={PokemonDetail} />
      <Route path="/pokemon" component={CreatePokemon} />
    </div>
  );
}

export default App;
