const fs = require('fs');
const request = require('request-promise-native');

module.exports = async filename => {
  const { CANVAS_URL_BASE, CANVAS_API_TOKEN } = process.env;
  const options = {
    method: 'POST',
    uri: `${CANVAS_URL_BASE}/api/v1/accounts/default/sis_imports`,
    headers: {
      authorization: `Bearer ${CANVAS_API_TOKEN}`,
    },
    formData: {
      import_type: 'instructure_csv',
      attachment: fs.createReadStream(filename),
      extension: 'csv',
    },
  };

  try {
    const response = await request(options);
    return response;
  } catch (error) {
    throw error;
  }
};
