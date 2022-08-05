import React from "react";
import "./Paginado.css";

//  CLASS COMPONENT!

export default function Paginado({
  allPokemons, // Recibe un numero con la cantidad te pokemons traidos desde el back
  pokemonsPerPage, // Recibe un numero con la cantidad de pokemons que quiero por pagina
  changePage, // Recibe una funcion para cambiar la pagina actual en el estado de Home
  currentPage, // Recibe el numero de pagina acual en en el estado de Home
}) {
  // Calculo el total de paginas
  const pageNumbers = Math.ceil(allPokemons / pokemonsPerPage);
  // Creo array vacío
  const pageNumbersArray = [];

  // Lleno el array con un numero por pagina
  for (let i = 0; i < pageNumbers; i++) {
    pageNumbersArray.push(i + 1);
  }

  return (
    <div className="paginado">
      {
        // Creo un boton prev
        pageNumbersArray && (
          <button
            className="buttonPaginado"
            key="prev"
            onClick={() => {
              changePage(currentPage > 1 ? currentPage - 1 : null);
            }}
          >
            Prev
          </button>
        )
      }
      {
        // Creo un boton por cada numero
        pageNumbersArray &&
          pageNumbersArray.map((page) => (
            <button
              className="buttonPaginado"
              key={page}
              onClick={() => {
                changePage(page);
              }}
            >
              {page}
            </button>
          ))
      }
      {
        // Creo un boton next
        pageNumbersArray && (
          <button
            className="buttonPaginado"
            key="next"
            onClick={() => {
              changePage(currentPage < pageNumbers ? currentPage + 1 : null);
            }}
          >
            Next
          </button>
        )
      }
    </div>
  );
}
