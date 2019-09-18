import React from 'react';
import { Redirect, Link } from "react-router-dom";

import getItems from '../../services/getItem';
import { getLoadingSpinner, getError } from '../../services/common';

function ItemDetail ({match}) {
  var evolutionsList = null;

  // graphql call to get the pokemon passing the id
  if (!match) return getError();
  const { loading, error, data } = getItems(match.params.item);
  if (loading) return getLoadingSpinner();
  if (error) return getError();
  if (data.pokemon === null) return <Redirect to={{ pathname: "/" }} />;

  const { image, name, number, types, maxHP, maxCP, evolutions } = data.pokemon;

  // render evolutions if exists
  if (evolutions) {
      evolutionsList = evolutions.map(({ id, name, image }) => (
      <div className="ui card" key={id}>
        <div className="meta"><h5>{name}</h5></div>
        <div className="image" style={{ backgroundImage: `url('${image}')`, backgroundColor: 'white', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '5rem' }} ></div>
        <div className="ui bottom attached button">
          <Link to={`/${id}`}>
            <i className="ellipsis vertical icon"></i>
            More
          </Link>
        </div>
      </div>
    ));
  }

  //render the Pokemon Detail page
 return <div className="ui container">

          {/* Back button */}
          <div className="ui container">
            <Link to={'/'} className="ui left floated labeled icon button">
              <i className="left arrow icon"></i>Back
            </Link>
          </div>

          {/* pokemon detail box */}
          <div className="ui container">
            <div className="ui relaxed divided items">
              <div className="item">

                {/* pokemon image box */}
                <div className="ui big image" >
                  <img alt={name} src={image} />
                </div>
                {/* pokemon description box */}
                <div className="content">
                  <h1>{name}</h1>
                  <div className="meta">
                    <span className="date">{number}</span>
                  </div>
                  <div className="description">
                    <p><b>Max HP:</b> {maxHP}</p>
                    <p><b>Max CP:</b> {maxCP}</p>
                    { types && <p><b>Type:</b> {types.join(', ')}</p>}
                  </div>

                  {/* evolution box */}
                  { evolutionsList &&
                    <div className="description">
                      <h4>Evolutions:</h4>
                      <div className="ui two doubling cards">{evolutionsList}</div>
                    </div>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>;
}

export default ItemDetail;
