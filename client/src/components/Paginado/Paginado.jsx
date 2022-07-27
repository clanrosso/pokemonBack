import React from "react";

//  CLASS COMPONENT!

export default function Paginado({ allPokemons, pokemonsPerPage, changePage }) {
  const pageNumbers = Math.ceil(allPokemons / pokemonsPerPage);
  const pageNumbersArray = [];

  for (let i = 0; i < pageNumbers; i++) {
    pageNumbersArray.push(i + 1);
  }

  return (
    <div>
      {pageNumbersArray &&
        pageNumbersArray.map((page) => (
          <button
            key={page}
            onClick={() => {
              changePage(page);
            }}
          >
            {page}
          </button>
        ))}
    </div>
  );
}
