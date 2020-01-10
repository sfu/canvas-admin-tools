const arc = require('@architect/functions');
const requireLogin = require('@architect/shared/requireLogin');

const handler = req => {
  const proxy = arc.http.proxy.public({ spa: true });
  return proxy(req);
};

exports.handler = arc.http.async(requireLogin, handler);
