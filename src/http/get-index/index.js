const arc = require('@architect/functions');
const requireLogin = require('@architect/shared/requireLogin');
// const render = require('@architect/shared/views/index.js');

// const handler = async req => {
//   return {
//     headers: { 'content-type': 'text/html; charset=utf8' },
//     body: 'hello',
//   };
// };

// exports.handler = arc.http.async(handler);

const handler = req => {
  const proxy = arc.http.proxy.public({ spa: true });
  return proxy(req);
};

exports.handler = arc.http.async(requireLogin, handler);
