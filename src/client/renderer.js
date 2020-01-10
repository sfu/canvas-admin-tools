import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './components/App';

console.log('this is the server renderer');

module.exports = function render() {
  const body = ReactDOMServer.renderToString(<App />);
  console.log(body);
  const html = `
<html>
<head></head>
<body>
  <div id="root">${body}</div>
  <script src="main.js"></script>
</body>
</html>
`;
  return html;
};
