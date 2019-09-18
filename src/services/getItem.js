import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// get the Pokemon item based on the id passed by param
function getQuery(id) {
  return gql`
  {
    pokemon(id: "${id}") {
      id
      number
      name
      maxCP
      maxHP
      image
      types
      evolutions {
        id
        number
        name
        maxCP
        maxHP
        image
        types
      }
    }
  }
  `;
}

function GetItem (id) { return useQuery(getQuery(id)); }

export default GetItem;
