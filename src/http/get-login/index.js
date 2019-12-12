const arc = require('@architect/functions');
const CAS = require('cas');

const { CAS_BASE_URL, CAS_SERVICE } = process.env;

const cas = new CAS({
  version: 3.0,
  base_url: CAS_BASE_URL,
  service: CAS_SERVICE,
});

const authenticate = (req, callback, service) => {
  // adapted from https://github.com/grahamb/node-cas/blob/CASv3/lib/cas.js

  // get the ticket from the URL
  const ticket = req.query.ticket;

  if (!ticket) {
    // If no ticket, we haven't been redirected to CAS and should do so
    const redirectUrl = `${CAS_BASE_URL}/login?service=${encodeURIComponent(
      service
    )}`;
    return {
      status: 307,
      headers: {
        'content-type': 'text/html',
        location: redirectUrl,
      },
    };
  } else {
    // Otherwise, we have a ticket and should validate it
    cas.validate(ticket, callback, service);
  }
};

const authenticateCasUser = async req => {
  console.log(process.env);
  console.log('authenticate cas user');
  const sess = await arc.http.session.read(req);
  console.log(sess);
  authenticate(
    req,
    async (err, status, username, extended) => {
      username = username && username.trim();
      if (err) {
        console.log('Error authenticating user with CAS: ', err);
        return {
          status: 500,
          body: {
            message: `Error authenticating user with CAS: ${err}`,
          },
        };
      } else {
        const redirectTo = '/sdtools/adduser';
        const cookie = await arc.http.session.write({
          loggedIn: status,
          username,
          casAttributes: extended,
        });
        console.log(cookie);
        return {
          status: 302,
          headers: {
            'set-cookie': cookie,
            location: redirectTo,
          },
        };
      }
    },
    CAS_SERVICE
  );
};

const handler = async req => {
  console.log(req);
  return {
    status: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(req.session),
  };
  // const redirectTo = arc.http.helpers.url(req.session.redirectTo);
  // return {
  //   status: 302,
  //   headers: {
  //     'content-type': 'text/plain; charset=utf8',
  //     location: redirectTo,
  //   },
  // };
};

exports.handler = arc.http.async(handler);
