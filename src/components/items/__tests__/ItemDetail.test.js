import React from 'react';
import ReactDOM from 'react-dom';
import { gql } from 'apollo-boost';
import { MockedProvider } from '@apollo/react-testing';
import { act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ItemDetail from '../ItemDetail';

const match = { params: { item: 'UG9rZW1vbjowMDE=' } };

const QUERY = gql`
{
  pokemon(id: "UG9rZW1vbjowMDE=") {
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
}`;

const MOCKS = [
  {
    request: {
      query: QUERY,
    },
    result: {
      data: {
        pokemon: {
          id: "UG9rZW1vbjowMDE=",
          number: "001",
          name: "Bulbasaur",
          maxCP: 951,
          maxHP: 1071,
          image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
          types: [
            "Grass",
            "Poison"
          ],
          evolutions: [{
            id: "UG9rZW1vbjowMDI=",
            number: "002",
            name: "Ivysaur",
            maxCP: 1483,
            maxHP: 1632,
            image: "https://img.pokemondb.net/artwork/ivysaur.jpg",
            types: [
              "Grass",
              "Poison"
            ]
          }],
        },
      },
    },
  },
];

const MOCKS_NULL = [
  {
    request: {
      query: QUERY,
    },
    result: {
      data: {
        pokemon: null
      }
    }
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
  ReactDOM.render(<MockedProvider mocks={[]}><ItemDetail match={match} /></MockedProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders pokemon item', async () => {
  const { container } = render(
    <BrowserRouter>
      <MockedProvider addTypename={false} mocks={MOCKS}>
        <ItemDetail match={match} />
      </MockedProvider>
    </BrowserRouter>
  );

  await wait();

  expect(container.textContent).toMatchSnapshot();

  expect(container.textContent).toMatch('Bulbasaur');
  expect(container.textContent).toMatch('Type: Grass, Poison');

});

it('renders pokemon evolutions', async () => {
  const { container } = render(
    <BrowserRouter>
      <MockedProvider addTypename={false} mocks={MOCKS}>
        <ItemDetail match={match} />
      </MockedProvider>
    </BrowserRouter>
  );

  await wait();

  expect(container.textContent).toMatch('Evolutions:Ivysaur');

});

it('renders error', async () => {
  const { container } = render(
    <BrowserRouter>
      <MockedProvider addTypename={false} mocks={MOCKS_ERROR}>
        <ItemDetail match={match} />
      </MockedProvider>
    </BrowserRouter>
  );

  await wait(0);

  expect(container.textContent).toBe('Error :( ');

});

it('renders empty pokemon list', async () => {
  const { container } = render(
    <BrowserRouter>
      <MockedProvider addTypename={false} mocks={MOCKS_NULL}>
        <ItemDetail match={match} />
      </MockedProvider>
    </BrowserRouter>
  );

  await wait(0);

  expect(container.textContent).toBe('');

});



// it('renders', async () => {
//
//   let root;
//
//   // act(() => {
//
//   root = create(
//       <MockedProvider mocks={[]}>
//         <ItemList />
//       </MockedProvider>
//     );
//
//     const tree = root.toJSON();
//
//     expect(tree).toMatchSnapshot();
//     await wait();
//     expect(tree).toContain('div');
//     //expect(root.textContent).toBe('Loading');
//
//   // })
//   await wait();
//
//   expect(root.toJSON()).toMatchSnapshot();
//
// });








// it('should render loading state initially', () => {
//   const component = create(
//     <MockedProvider mocks={[]}>
//       <ItemList />
//     </MockedProvider>,
//   );
//
//   const tree = component.toJSON();
//   expect(tree.children).toContain('Loading');
// });
