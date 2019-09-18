import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const limit = 200;

// get the first 200 pokemons
function GetAllItems () {
  const QUERY = gql`
  {
    pokemons(first: ${limit}) {
      id
      number
      name
      maxCP
      maxHP
      image
      types
    }
  }
  `;

  return useQuery(QUERY); }

export default GetAllItems;
