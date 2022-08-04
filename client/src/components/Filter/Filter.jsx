import React from "react";

const Filter = ({ filterApiOrDb, filterType, handleOrder, allTypes }) => {
  return (
    <div>
      <select key="filterApiOrDb" onChange={(e) => filterApiOrDb(e)}>
        <option value="all">Todos los Pokemons</option>
        <option value="db">Pokemons creados</option>
        <option value="api">Pokemons existentes</option>
      </select>

      <select key="filterType" onChange={(e) => filterType(e)}>
        <option value="all">Todos los Pokemons</option>
        {
          // Mapeo el array de tipos y retorno una opcion por cada tipo
          allTypes &&
            allTypes.map((t) => {
              return <option value={t.name}>{t.name}</option>;
            })
        }
      </select>

      <select key="order_alfabet" onChange={(e) => handleOrder(e)}>
        <option disabled defaultValue>
          Orden por alfabeto
        </option>
        <option value="asc_alfabet">De la A a la Z</option>
        <option value="desc_alfabet">De la Z a la A</option>
      </select>

      <select key="order_attack" onChange={(e) => handleOrder(e)}>
        <option disabled defaultValue>
          Orden ataque
        </option>
        <option value="desc_attack">Los mas fuertes</option>
        <option value="asc_attack">Los mas debiles</option>
      </select>
    </div>
  );
};

export default Filter;
