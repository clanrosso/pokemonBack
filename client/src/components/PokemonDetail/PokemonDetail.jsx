import React, { Component } from "react";
import { connect } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./PokemonDetail.css";

export class PokemonDetail extends Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
  }

  componentDidMount() {
    this.props.getPokemonById(this.id);
  }

  // Los pokemon de la Api traen un array type ej: [tipo1, tipo2]
  // Los pokemon de la DB traen un array con tipos ej: [{name:tipo1}, {name:tipo2}]

  unifiedTypes = () => {
    let typeArray = [];
    let typeString = " - ";
    let tipos = this.props.pokemonDetail.tipos;
    let type = this.props.pokemonDetail.type;

    if (tipos) {
      tipos.forEach((t) => {
        typeArray.push(t.name);
      });
    }
    if (type) {
      return (typeArray = type);
    }

    for (let i = 0; i < typeArray.length; i++) {
      typeString =
        typeString +
        typeArray[i][0].toUpperCase() +
        typeArray[i].slice(1) +
        " - ";
    }
    return typeString;
  };

  render() {
    const typeString = this.unifiedTypes();
    const pokemonDetail = this.props.pokemonDetail;
    return (
      <div className="detail">
        <div className="left">
          {pokemonDetail.name ? (
            <h1 className="name">{`Nombre: ${
              pokemonDetail.name[0].toUpperCase() + pokemonDetail.name.slice(1)
            }`}</h1>
          ) : (
            <h2 className="cargandoForm">Buscando Pokemon seleccionado </h2>
          )}

          {pokemonDetail.image ? (
            <img
              className="imageDetail"
              src={pokemonDetail.image}
              alt="Imagen no encontrada"
              width="300px"
              height="350px"
            />
          ) : (
            <h4 className="cargandoForm">Cargando imagen del pokemon...</h4>
          )}
          <Link to={"/home"}>
            <button className="button">Volver</button>
          </Link>
        </div>

        <div className="right">
          {pokemonDetail.hp ? (
            <>
              <h4 className="itemDetail">{`Tipo: ${typeString}`}</h4>
              <h4 className="itemDetail">{`Altura: ${pokemonDetail.height}`}</h4>
              <h4 className="itemDetail">{`Peso: ${pokemonDetail.weight}`}</h4>
              <h4 className="itemDetail">{`Vida: ${pokemonDetail.hp}`}</h4>
              <h4 className="itemDetail">{`Ataque: ${pokemonDetail.attack}`}</h4>
              <h4 className="itemDetail">{`Defensa: ${pokemonDetail.defense}`}</h4>
              <h4 className="itemDetail">{`Velocidad: ${pokemonDetail.speed}`}</h4>
              <h4 className="itemDetail">{`ID: ${pokemonDetail.ID}`}</h4>
            </>
          ) : (
            <h4 className="cargandoForm">Cargando datos del pokemon...</h4>
          )}
        </div>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getPokemonById: (id) => dispatch(getPokemonById(id)),
  };
};

export const mapStateToProps = (state) => {
  return {
    pokemonDetail: state.pokemonDetail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);
