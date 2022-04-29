import React from 'react';

function App() {
  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'JSX'),
    React.createElement(
      'div',
      null,
      React.createElement('input', {
        type: 'text',
      })
    ),
    React.createElement('div', null, new Date().toLocaleString())
  );
}

var _default = App;
exports.default = _default;
