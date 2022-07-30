import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createPokemon, getAllTypes } from "../../redux/actions";

//  FUNCTIONAL COMPONENT!

const CreatePokemon = () => {
  const [payload, setPayload] = React.useState({
    name: "",
    image: "",
    height: "",
    weight: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    tipo: [],
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const allTypes = useSelector((state) => state.allTypes);

  React.useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  const handleChange = (e) => {
    if (
      (e.target.name === "name" || e.target.name === "image") &&
      Number.isInteger(Number(e.target.value))
    ) {
      return alert("Debes ingresar un texto");
    }
    if (
      (e.target.name === "height" ||
        e.target.name === "weight" ||
        e.target.name === "hp" ||
        e.target.name === "attack" ||
        e.target.name === "defense" ||
        e.target.name === "speed") &&
      !Number.isInteger(Number(e.target.value))
    ) {
      return alert("Debes ingresar un numero");
    }
    if (
      (e.target.name === "hp" ||
        e.target.name === "attack" ||
        e.target.name === "defense" ||
        e.target.name === "speed") &&
      (e.target.value < 0 || e.target.value > 300)
    ) {
      return alert("Debes ingresar un numero entre 0 y 300");
    }
    if (
      e.target.name === "height" &&
      (e.target.value < 0 || e.target.value > 25)
    ) {
      return alert("Debes ingresar una altura entre 0 y 25");
    }
    if (
      e.target.name === "weight" &&
      (e.target.value < 0 || e.target.value > 1500)
    ) {
      return alert("Debes ingresar un peso entre 0 y 1500");
    }
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const selectChange = (e) => {
    setPayload({
      ...payload,
      tipo: [...payload.tipo, e.target.value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPokemon(payload));
    setPayload({
      name: "",
      image: "",
      height: "",
      weight: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      tipo: [],
    });
    alert("Pokemon creado con exito");
    history.push("/home");
  };

  return (
    <div>
      <Link to="/home">
        <button>Volver a la pagina principal</button>
      </Link>
      <h1>Crea tu propio Pokemon</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={payload.name}
          onChange={(e) => handleChange(e)}
        />

        <label>Imagen: </label>
        <input
          type="text"
          name="image"
          value={payload.image}
          onChange={(e) => handleChange(e)}
        />

        <label>Altura: </label>
        <input
          type="number"
          name="height"
          value={payload.height}
          onChange={(e) => handleChange(e)}
        />

        <label>Peso: </label>
        <input
          type="number"
          name="weight"
          value={payload.weight}
          onChange={(e) => handleChange(e)}
        />

        <label>Vida: </label>
        <input
          type="number"
          name="hp"
          value={payload.hp}
          onChange={(e) => handleChange(e)}
        />

        <label>Ataque: </label>
        <input
          type="number"
          name="attack"
          value={payload.attack}
          onChange={(e) => handleChange(e)}
        />

        <label>Defensa: </label>
        <input
          type="number"
          name="defense"
          value={payload.defense}
          onChange={(e) => handleChange(e)}
        />

        <label>Velocidad: </label>
        <input
          type="number"
          name="speed"
          value={payload.speed}
          onChange={(e) => handleChange(e)}
        />
        <select onChange={(e) => selectChange(e)}>
          <option value="all">Todos los Pokemons</option>
          {allTypes &&
            allTypes.map((t) => {
              return <option value={t.name}>{t.name}</option>;
            })}
        </select>
        <ul>
          {payload.tipo.map((t) => {
            return <li>{t}</li>;
          })}
        </ul>
        <button type="submit">Crear Pokemon</button>
      </form>
    </div>
  );
};

export default CreatePokemon;
