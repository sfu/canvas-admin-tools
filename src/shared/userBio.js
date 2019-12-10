// get the user bio object from AOBREST
const request = require('request-promise-native');
const { ART_TOKEN } = process.env;
const URL =
  'https://rest.its.sfu.ca/cgi-bin/WebObjects/AOBRestServer.woa/rest/datastore2/global/userBio.js';

module.exports = async username => {
  try {
    const bio = await request.get(URL, {
      qs: {
        username,
        art_token: ART_TOKEN,
      },
    });
    return bio;
  } catch (response) {
    if (response.statusCode === 404) {
      const err = new Error(`No such computing ID: ${username}`);
      err.code = 'INVALID_COMPUTING_ID';
      throw err;
    } else {
      throw response;
    }
  }
};
