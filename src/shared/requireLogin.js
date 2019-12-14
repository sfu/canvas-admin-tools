const arc = require('@architect/functions');

const requireLogin = async req => {
  const redirectTo = arc.http.helpers.url(req.path);
  const { session } = req;
  session.redirectTo = session.redirectTo || redirectTo;
  if (!session.loggedIn) {
    return {
      cookie: session,
      status: 302,
      location: arc.http.helpers.url('/login'),
    };
  }
};

module.exports = requireLogin;
