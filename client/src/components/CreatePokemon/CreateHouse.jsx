import React from "react";
import { useDispatch } from "react-redux";
import { createHouse } from "../../redux/actions";

// CUIDADOOOO. SI O SI FUNCTIONAL COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
// TAMBIEN VAS A TENER QUE USAR HOOKS!
// Recordar que los hooks de React deben utilizarse de la forma "React.useState", "React.useEffect", etc.
// Los tests no van a reconocer la ejecución haciendo destructuring de estos métodos.
const CreateHouse = () => {
  const [state, setState] = React.useState({
    name: "",
    region: "",
    words: "",
  });

  const dispatch = useDispatch();

  const cambiarEstado = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const crearCasa = (event) => {
    event.preventDefault();
    dispatch(createHouse(state));
  };

  return (
    <div>
      <form onSubmit={(e) => crearCasa(e)}>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={cambiarEstado}
        />

        <label>Region: </label>
        <input
          type="text"
          name="region"
          value={state.region}
          onChange={cambiarEstado}
        />

        <label>Words: </label>
        <input
          type="text"
          name="words"
          value={state.words}
          onChange={cambiarEstado}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateHouse;
