import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';

import App from './components/main/App';
import ItemList from './components/items/ItemList';
import ItemDetail from './components/items/ItemDetail';
import { getApolloClient } from './services/common';

// Implement apollo provider, the router and app
ReactDOM.render(
  <ApolloProvider client={getApolloClient()}>
    <App>
      <Router>
        <Route exact path="/" component={ItemList} />
        <Route path="/:item" component={ItemDetail} />
      </Router>
    </App>
  </ApolloProvider>,
document.getElementById('root'));
