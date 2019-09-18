import React from 'react';

import './app.scss';

// render to navigation bar
function App (props) {
  return <div className="App">
          <div className="ui fixed inverted menu">
            <div className="ui container">
              <a href="/" className="header item">
                <span className="logo">Pokemon App</span>
              </a>
            </div>
          </div>
          <div className="ui container">{props.children}</div>
        </div>;
}

export default App;
