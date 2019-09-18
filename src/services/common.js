import React from 'react';
import ApolloClient from 'apollo-boost';

// create apollo client
export function getApolloClient () {
  return new ApolloClient({ uri: 'https://pokemon-samdavies.stylindex.now.sh' });
}

// load the spinner used on the graphql calls
export function getLoadingSpinner () {
  return <div className="loader-spinner ui segment">
    <div className="ui active dimmer">
      <div className="ui text loader">Loading</div>
      </div>
  </div>;
}

// show error message
export function getError (error) {
  return <p>Error :( {error}</p>;
}
