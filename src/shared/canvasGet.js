const request = require('request-promise-native');
const { CANVAS_URL_BASE, CANVAS_API_TOKEN } = process.env;

module.exports = async path => {
  try {
    const data = await request.get(`${CANVAS_URL_BASE}/api/v1/${path}`, {
      headers: {
        authorization: `Bearer ${CANVAS_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
