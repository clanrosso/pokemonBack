import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createPokemon, getAllTypes } from "../../redux/actions";
import "./CreatePokemon.css";
import Swal from "sweetalert2";

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

  const allTypes = useSelector((state) => state.allTypes);

  React.useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  const validation = (payload) => {
    let errors = {};

    if (Number.isInteger(parseInt(payload.name)))
      errors.name = "Debes ingresar un texto";
    if (Number.isInteger(parseInt(payload.image)))
      errors.image = "Debes ingresar un texto";

    if (Number.isNaN(Number(payload.height)))
      errors.height = "Debes ingresar un numero";
    if (Number.isNaN(Number(payload.weight)))
      errors.weight = "Debes ingresar un numero";
    if (Number.isNaN(Number(payload.hp)))
      errors.hp = "Debes ingresar un numero";
    if (Number.isNaN(Number(payload.attack)))
      errors.attack = "Debes ingresar un numero";
    if (Number.isNaN(Number(payload.defense)))
      errors.defense = "Debes ingresar un numero";
    if (Number.isNaN(Number(payload.speed)))
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

  // Con esta funcion manejo los cambios en los input
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

  // Con esta funcion manejo los cambios en el select
  const selectChange = (e) => {
    if (payload.tipo.length === 3)
      return Swal.fire({
        title: "Solo puedes seleccionar 3 tipos",
        background: "#545552",
        color: "#ffd700",
        confirmButtonColor: "#ffd700",
        imageAlt: "Custom image",
        showClass: {
          popup: "animate_animated animate_flipInY",
        },
      });

    setPayload({
      ...payload,
      tipo: [...payload.tipo, e.target.value],
    });
  };

  // Con esta funcion se puede eliminar tipos ya elegidos en el select
  const deleteTipe = (arg) => {
    setPayload({
      ...payload,
      tipo: payload.tipo.filter((t) => t !== arg),
    });
  };

  // Con esta funcion dispatcho la accion para crear el nuevo pokemon
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (payload.name === "")
      return Swal.fire({
        title: "Debes enviar un nombre para el nuevo Pokemon",
        background: "#545552",
        color: "#ffd700",
        confirmButtonColor: "#ffd700",
        imageAlt: "Custom image",
        showClass: {
          popup: "animate_animated animate_flipInY",
        },
      });

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
  };

  return (
    <div className="containerForm">
      <Link to="/home">
        <button className="buttonFormBack">Volver a la pagina principal</button>
      </Link>
      <h1 className="titleForm">Crea tu propio Pokemon</h1>

      <form className="form">
        <div className="internoForm">
          <div className="item">
            <label className="label">Name: </label>
            <input
              className="inputForm"
              type="text"
              name="name"
              value={payload.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className="errorForm">{errors.name}</p>}
          </div>

          <div className="item">
            <label className="label">Imagen: </label>
            <input
              className="inputForm"
              type="text"
              name="image"
              value={payload.image}
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p className="errorForm">{errors.image}</p>}
          </div>

          <div className="item">
            <label className="label">Altura: </label>
            <input
              className="inputForm"
              type="number"
              name="height"
              value={payload.height}
              onChange={(e) => handleChange(e)}
            />
            {errors.height && <p className="errorForm">{errors.height}</p>}
          </div>

          <div className="item">
            <label className="label">Peso: </label>
            <input
              className="inputForm"
              type="number"
              name="weight"
              value={payload.weight}
              onChange={(e) => handleChange(e)}
            />
            {errors.weight && <p className="errorForm">{errors.weight}</p>}
          </div>

          <div className="item">
            <label className="label">Vida: </label>
            <input
              className="inputForm"
              type="number"
              name="hp"
              value={payload.hp}
              onChange={(e) => handleChange(e)}
            />
            {errors.hp && <p className="errorForm">{errors.hp}</p>}
          </div>

          <div className="item">
            <label className="label">Ataque: </label>
            <input
              className="inputForm"
              type="number"
              name="attack"
              value={payload.attack}
              onChange={(e) => handleChange(e)}
            />
            {errors.attack && <p className="errorForm">{errors.attack}</p>}
          </div>

          <div className="item">
            <label className="label">Defensa: </label>
            <input
              className="inputForm"
              type="number"
              name="defense"
              value={payload.defense}
              onChange={(e) => handleChange(e)}
            />
            {errors.defense && <p className="errorForm">{errors.defense}</p>}
          </div>

          <div className="item">
            <label className="label">Velocidad: </label>
            <input
              className="inputForm"
              type="number"
              name="speed"
              value={payload.speed}
              onChange={(e) => handleChange(e)}
            />
            {errors.speed && <p className="errorForm">{errors.speed}</p>}
          </div>
        </div>

        <div className="internoForm">
          <select className="selectForm" onChange={(e) => selectChange(e)}>
            <option value="all">Selecciona un tipo</option>
            {allTypes &&
              allTypes.map((t) => {
                return (
                  <option value={t.name}>
                    {t.name[0].toUpperCase() + t.name.slice(1)}
                  </option>
                );
              })}
          </select>

          <button onClick={(e) => handleSubmit(e)} className="buttonFormSubmit">
            Crear Pokemon
          </button>
        </div>
      </form>
      <div className="containerTypes">
        {payload.tipo.map((t) => {
          return (
            <div className="types" key={t.name}>
              <p>{t[0].toUpperCase() + t.slice(1)}</p>
              <button className="buttonTypes" onClick={() => deleteTipe(t)}>
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreatePokemon;
