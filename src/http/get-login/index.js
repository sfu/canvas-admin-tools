const arc = require('@architect/functions');
const CAS = require('cas');

const { CAS_BASE_URL, CAS_SERVICE } = process.env;

const cas = new CAS({
  version: 3.0,
  base_url: CAS_BASE_URL,
  service: CAS_SERVICE,
});

const authenticateCasUser = async req => {
  const { session } = req;

  const ticket = req.query.ticket;
  if (!ticket) {
    const redirectUrl = `${CAS_BASE_URL}/login?service=${encodeURIComponent(
      CAS_SERVICE
    )}`;
    return {
      status: 302,
      cookie: req.session,
      location: redirectUrl,
    };
  }

  const {
    authenticated,
    username,
    extendedAttributes,
  } = await cas.validatePromise(ticket, CAS_SERVICE);

  if (authenticated) {
    session.loggedIn = authenticated;
    session.username = username.trim();
    session.casAttributes = extendedAttributes.attributes;
    return {
      cookie: session,
      status: 302,
      location: session.redirectTo,
    };
  }
};

const handler = async req => {
  const { session } = req;
  const redirectTo = arc.http.helpers.url(session.redirectTo);
  delete session.redirectTo;
  return {
    status: 302,
    headers: {
      'content-type': 'text/plain; charset=utf8',
      location: redirectTo,
    },
  };
};

exports.handler = arc.http.async(authenticateCasUser, handler);
