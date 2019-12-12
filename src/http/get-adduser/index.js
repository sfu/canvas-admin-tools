const arc = require('@architect/functions');

const requireLogin = async req => {
  const redirectTo = arc.http.helpers.url(req.path);
  const { session } = req;
  session.redirectTo = redirectTo;
  session.wtf = 'wtf';
  if (!session.loggedIn) {
    return {
      cookie: session,
      status: 302,
      location: arc.http.helpers.url('/login'),
    };
  }
};

const handler = async req => {
  const { session } = req;
  if (!session.loggedIn) {
    session.redirectTo = arc.http.helpers.url(req.path);
    session.wtf = 'wtf';
    return {
      cookie: session,
      status: 302,
      location: '/login',
    };
  } else {
    return {
      headers: { 'content-type': 'text/html; charset=utf8' },
      body: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Add User</title>
      <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .max-width-320 {
        max-width: 20rem;
      }
      .margin-left-8 {
        margin-left: 0.5rem;
      }
      .margin-bottom-16 {
        margin-bottom: 1rem;
      }
      .margin-bottom-8 {
        margin-bottom: 0.5rem;
      }
      .padding-32 {
        padding: 2rem;
      }
      .color-grey {
        color: #333;
      }
      .color-black-link:hover {
        color: black;
      }
      </style>
      </head>
      <body class="padding-32">
      <form action="/sdtools/adduser" method="post">
      <label for="courseId">Course ID</label><input name="courseId" id="courseId" type="text"/><br />
      <label for="role">Role</label><select name="role" id="role">
      <option value="teacher">Teacher</option>
      <option value="student">Student</option>
      <option value="ta">TA</option>
      <option value="observer">Observer</option>
      </select><br />
      <label>Computing ID</label><input type="text" name="users[]"/><br/>
      <label>Computing ID</label><input type="text" name="users[]"/><br/>
      <label>Computing ID</label><input type="text" name="users[]"/><br/>
      <label>Computing ID</label><input type="text" name="users[]"/><br/>
      <input type="submit" value="Submit"/>
      </form>
      </body>
      </html>
      `,
    };
  }
};

exports.handler = arc.http.async(requireLogin, handler);
