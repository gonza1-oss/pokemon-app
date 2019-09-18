import React from 'react';
import ReactDOM from 'react-dom';
import { gql } from 'apollo-boost';
import { MockedProvider } from '@apollo/react-testing';
import { act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ItemList from '../ItemList';

const QUERY = gql`
{
  pokemons(first: 200) {
    id
    number
    name
    maxCP
    maxHP
    image
    types
  }
}`;

const MOCKS = [
  {
    request: {
      query: QUERY,
    },
    result: {
      data: {
        pokemons: [{
          id: "UG9rZW1vbjowMDE=",
          number: "001",
          name: "Bulbasaur",
          maxCP: 951,
          maxHP: 1071,
          image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
          types: [
            "Grass",
            "Poison"
          ]
        }],
      },
    },
  },
];

const MOCKS_ERROR = [
  {
    request: {
      query: QUERY,
    },
    result: null
  },
];

async function wait(ms = 0) {
  await act(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MockedProvider mocks={[]}><ItemList /></MockedProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders loading spinner', async () => {
  const { container } = render(
    <BrowserRouter>
      <MockedProvider addTypename={false} mocks={MOCKS}>
        <ItemList />
      </MockedProvider>
    </BrowserRouter>
  );

  expect(container.textContent).toBe('Loading');

});

it('renders error', async () => {
  const { container } = render(
    <BrowserRouter>
      <MockedProvider addTypename={false} mocks={MOCKS_ERROR}>
        <ItemList />
      </MockedProvider>
    </BrowserRouter>
  );

  await wait(0);

  expect(container.textContent).toBe('Error :( ');

});

it('renders pokemon list', async () => {
  const { container } = render(
    <BrowserRouter>
      <MockedProvider addTypename={false} mocks={MOCKS}>
        <ItemList />
      </MockedProvider>
    </BrowserRouter>
  );

  await wait();

  expect(container.textContent).toMatchSnapshot();

  expect(container.textContent).toMatch('Bulbasaur');
  expect(container.textContent).toMatch('Type: Grass, Poison');
});
