import React from "react";
import { /*useDispatch*/ useSelector } from "react-redux";
//import { getHouse } from "../../redux/actions";
//import CharacterCard from "../CharacterCard/CharacterCard";

// CUIDADOOOO. SI O SI FUNCTIONAL COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
// TAMBIEN VAS A TENER QUE USAR HOOKS!
const PokemonDetail = (props) => {
  // const dispatch = useDispatch();
  const house = useSelector((state) => state.house);

  React.useEffect(() => {
    //  dispatch(getHouse(props.match.params.houseId));
  }, []);

  return (
    <div>
      <h3>{house.name}</h3>
      <p>{`Region: ${house.region}`}</p>
      <p>{`Words: ${house.words}`}</p>

      {/*house.characters &&
        house.characters.map((item) => (
          <CharacterCard
            key={item.id}
            id={item.id}
            fullName={item.fullName}
            title={item.title}
            imageUrl={item.imageUrl}
            family={item.family}
          />
        ))*/}
    </div>
  );
};

export default PokemonDetail;
