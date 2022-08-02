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
  const [errors, setError] = React.useState({});

  const dispatch = useDispatch();
  const history = useHistory();
  const allTypes = useSelector((state) => state.allTypes);

  React.useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  const validation = (payload) => {
    let errors = {};
    if (Number.isInteger(Number(payload.name)))
      errors.name = "Debes ingresar un texto";
    if (Number.isInteger(Number(payload.image)))
      errors.image = "Debes ingresar un texto";

    if (!Number.isInteger(Number(payload.height)))
      errors.height = "Debes ingresar un numero";
    if (!Number.isInteger(Number(payload.weight)))
      errors.weight = "Debes ingresar un numero";
    if (!Number.isInteger(Number(payload.hp)))
      errors.hp = "Debes ingresar un numero";
    if (!Number.isInteger(Number(payload.attack)))
      errors.attack = "Debes ingresar un numero";
    if (!Number.isInteger(Number(payload.defense)))
      errors.defense = "Debes ingresar un numero";
    if (!Number.isInteger(Number(payload.speed)))
      errors.speed = "Debes ingresar un numero";

    if (payload.hp < 0 || payload.hp > 300)
      errors.hp = "Debes ingresar un valor entre 0 y 300";
    if (payload.attack < 0 || payload.attack > 300)
      errors.attack = "Debes ingresar un valor entre 0 y 300";
    if (payload.defense < 0 || payload.defense > 300)
      errors.defense = "Debes ingresar un valor entre 0 y 300";
    if (payload.speed < 0 || payload.speed > 300)
      errors.speed = "Debes ingresar un valor entre 0 y 300";

    if (payload.height < 0 || payload.height > 25)
      errors.height = "Debes ingresar un valor entre 0 y 25";
    if (payload.weight < 0 || payload.weight > 1500)
      errors.weight = "Debes ingresar un valor entre 0 y 1500";

    return errors;
  };

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
    setError(
      validation({
        ...payload,
        [e.target.name]: e.target.value,
      })
    );
  };

  const selectChange = (e) => {
    setPayload({
      ...payload,
      tipo: [...payload.tipo, e.target.value],
    });
  };

  const deleteTipe = (arg) => {
    setPayload({
      ...payload,
      tipo: payload.tipo.filter((t) => t !== arg),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!payload.name)
      return alert("Debes enviar un nombre para el nuevo Pokemon");
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
        {errors.name && <p>{errors.name}</p>}

        <label>Imagen: </label>
        <input
          type="text"
          name="image"
          value={payload.image}
          onChange={(e) => handleChange(e)}
        />
        {errors.image && <p>{errors.image}</p>}

        <label>Altura: </label>
        <input
          type="number"
          name="height"
          value={payload.height}
          onChange={(e) => handleChange(e)}
        />
        {errors.height && <p>{errors.height}</p>}

        <label>Peso: </label>
        <input
          type="number"
          name="weight"
          value={payload.weight}
          onChange={(e) => handleChange(e)}
        />
        {errors.weight && <p>{errors.weight}</p>}

        <label>Vida: </label>
        <input
          type="number"
          name="hp"
          value={payload.hp}
          onChange={(e) => handleChange(e)}
        />
        {errors.hp && <p>{errors.hp}</p>}

        <label>Ataque: </label>
        <input
          type="number"
          name="attack"
          value={payload.attack}
          onChange={(e) => handleChange(e)}
        />
        {errors.attack && <p>{errors.attack}</p>}

        <label>Defensa: </label>
        <input
          type="number"
          name="defense"
          value={payload.defense}
          onChange={(e) => handleChange(e)}
        />
        {errors.defense && <p>{errors.defense}</p>}

        <label>Velocidad: </label>
        <input
          type="number"
          name="speed"
          value={payload.speed}
          onChange={(e) => handleChange(e)}
        />
        {errors.speed && <p>{errors.speed}</p>}

        <select onChange={(e) => selectChange(e)}>
          <option value="all">Selecciona un tipo</option>
          {allTypes &&
            allTypes.map((t) => {
              return <option value={t.name}>{t.name}</option>;
            })}
        </select>

        <button type="submit">Crear Pokemon</button>
      </form>
      <div>
        {payload.tipo.map((t) => {
          return (
            <div>
              <p>{t}</p>
              <button onClick={() => deleteTipe(t)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreatePokemon;
