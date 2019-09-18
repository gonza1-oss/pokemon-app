import React from 'react';
import { Link } from "react-router-dom";

import getAllItems from '../../services/getAllItems';
import { getLoadingSpinner, getError } from '../../services/common';

function ItemList () {

  // graphql call to get the pokemon list
  const { loading, error, data } = getAllItems();
  if (loading) return getLoadingSpinner();
  if (error) return getError();

  // compone the pokemon card item
  const pokemons = data.pokemons.map(({ id, number, name, maxHP, maxCP, image, types }) => (
    <div className="ui card" key={id}>

      {/* pokemon image box */}
      <div className="image" style={{ background: `white url('${image}') no-repeat center`, backgroundSize: 'contain' }}></div>
      <div className="content">
        <Link to={`/${id}`} className="header">{name}</Link>
        <div className="meta">
          <span className="date">{number}</span>
        </div>

        {/* pokemon description box */}
        <div className="description">
          <p><b>Max HP:</b> {maxHP}</p>
          <p><b>Max CP:</b> {maxCP}</p>
          <p><b>Type:</b> {types.join(', ')}</p>
        </div>
      </div>

      {/* more information button */}
      <div className="ui bottom attached button">
        <Link to={`/${id}`}>
          <i className="ellipsis vertical icon"></i>
          More information
        </Link>
      </div>
    </div>
    ));

    return <div className="ui centered link cards">{pokemons}</div>;
}

export default ItemList;
