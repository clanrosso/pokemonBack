import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// Importo las acciones que voy a utilizar
import { createPokemon, getAllTypes } from "../../redux/actions";

//  FUNCTIONAL COMPONENT!

const CreatePokemon = () => {
  // Creo un estado local con un payload que voy a enviar por body hacia el back
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
  // Creo un estado local con errores, comienza con un objeto vacío
  const [errors, setError] = React.useState({});

  const dispatch = useDispatch();
  const history = useHistory();
  // Traigo todos los tipos de pokemon desde el estado de redux
  const allTypes = useSelector((state) => state.allTypes);

  // Al montar el componete dispatcho una accion para pedir todos los tipos de pokemon
  React.useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  // Con esta función voy a validar la info ingresa por input
  const validation = (payload) => {
    // Inicio un objeto vacío y si entra en algun caso,
    //voy creando distintas keys con un mensaje
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

  // Con esta funcion manejo los cambios en los input
  const handleChange = (e) => {
    // Setéo el payload
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
    // Setéo los erroes
    setError(
      validation({
        ...payload,
        [e.target.name]: e.target.value,
      })
    );
  };

  // Con esta funcion manejo los cambios en el select
  const selectChange = (e) => {
    setPayload({
      ...payload,
      // Voy concatenando los tipos seleccionados
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // El name es dato obligatorio, si no está retorno una alerta
    if (!payload.name)
      return alert("Debes enviar un nombre para el nuevo Pokemon");
    // Distpacho la accion
    dispatch(createPokemon(payload));
    // Limpio el payload
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
    // Redirijo al Home
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
        {
          // Si tengo erroes para este input, los muestro
          errors.name && <p>{errors.name}</p>
        }

        <label>Imagen: </label>
        <input
          type="text"
          name="image"
          value={payload.image}
          onChange={(e) => handleChange(e)}
        />
        {
          // Si tengo erroes para este input, los muestro
          errors.image && <p>{errors.image}</p>
        }

        <label>Altura: </label>
        <input
          type="number"
          name="height"
          value={payload.height}
          onChange={(e) => handleChange(e)}
        />
        {
          // Si tengo erroes para este input, los muestro
          errors.height && <p>{errors.height}</p>
        }

        <label>Peso: </label>
        <input
          type="number"
          name="weight"
          value={payload.weight}
          onChange={(e) => handleChange(e)}
        />
        {
          // Si tengo erroes para este input, los muestro
          errors.weight && <p>{errors.weight}</p>
        }

        <label>Vida: </label>
        <input
          type="number"
          name="hp"
          value={payload.hp}
          onChange={(e) => handleChange(e)}
        />
        {
          // Si tengo erroes para este input, los muestro
          errors.hp && <p>{errors.hp}</p>
        }

        <label>Ataque: </label>
        <input
          type="number"
          name="attack"
          value={payload.attack}
          onChange={(e) => handleChange(e)}
        />
        {
          // Si tengo erroes para este input, los muestro
          errors.attack && <p>{errors.attack}</p>
        }

        <label>Defensa: </label>
        <input
          type="number"
          name="defense"
          value={payload.defense}
          onChange={(e) => handleChange(e)}
        />
        {
          // Si tengo erroes para este input, los muestro
          errors.defense && <p>{errors.defense}</p>
        }

        <label>Velocidad: </label>
        <input
          type="number"
          name="speed"
          value={payload.speed}
          onChange={(e) => handleChange(e)}
        />
        {
          // Si tengo erroes para este input, los muestro
          errors.speed && <p>{errors.speed}</p>
        }

        <select onChange={(e) => selectChange(e)}>
          <option value="all">Selecciona un tipo</option>
          {
            // Mapeo el array de tipos y retorno una opcion por cada tipo
            allTypes &&
              allTypes.map((t) => {
                return <option value={t.name}>{t.name}</option>;
              })
          }
        </select>

        <button type="submit">Crear Pokemon</button>
      </form>
      <div>
        {
          // Si tengo tipos seleccionados, los muestro, con su boton para eliminarlo
          payload.tipo.map((t) => {
            return (
              <div>
                <p>{t}</p>
                <button onClick={() => deleteTipe(t)}>X</button>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default CreatePokemon;
