const fs = require('fs').promises;
const arc = require('@architect/functions');
const requireLogin = require('@architect/shared/requireLogin');
const userBio = require('@architect/shared/userBio');
const canvasGet = require('@architect/shared/canvasGet');
const postSISFile = require('./postSISFile');
const tmp = require('tmp-promise');

const handler = async req => {
  /* input is a JSON object with shape
      {
        courseId: 12345,
        users: [ computingId ],
        role: "teacher|student|ta|observer"
      }
  */

  /*
      - check that the course exists
      - for each user:
        - get the SFU ID from AOBREST
      - construct the CSV file
      - upload CSV to Canvas, get progress object
      - return progress
  */
  const { courseId, role } = req.body;
  const users = [...new Set(req.body.users.filter(Boolean))];

  console.log({ courseId, role, users });
  // get the course to ensure it exists and has a SIS ID
  let course;
  try {
    course = await canvasGet(`courses/${courseId}`);
    if (!course.sis_course_id) {
      return {
        status: 500,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          error: `Course with ID ${courseId} does not have a SIS ID.`,
        }),
      };
    }
  } catch (response) {
    let error;
    if (response.statusCode === 404) {
      error = `No Canvas course with ID ${courseId} could be found.`;
    } else {
      error = `An unknown error occurred.`;
    }

    return {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        error,
      }),
    };
  }

  // map the computingIDs to SFUIDs
  let bios;
  try {
    bios = await Promise.all(users.map(u => userBio(u)));
  } catch (error) {
    let message;
    if (error.code === 'INVALID_COMPUTING_ID') {
      message = error.message;
    } else {
      message = `An unknown error occurred.`;
    }
    return {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        error: message,
      }),
    };
  }
  const sfuIds = bios.map(bio => bio.sfuid);

  // construct the CSV file
  const csv = ['course_id,user_id,role,status'];
  sfuIds.forEach(id => {
    csv.push(`${course.sis_course_id},${id},${role},active`);
  });

  // write CSV to a tmpfile
  let tmpfile;
  try {
    tmpfile = await tmp.file({ postfix: '.csv' });
    await fs.writeFile(tmpfile.path, csv.join('\n'), 'utf-8');
  } catch (error) {
    return {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Error writing CSV file',
      }),
    };
  }

  // upload the CSV to Canvas
  try {
    const uploadResp = await postSISFile(tmpfile.path);
    return {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
      body: uploadResp,
    };
  } catch (error) {
    return {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Error uploading CSV file',
      }),
    };
  }
};

exports.handler = arc.http.async(handler);
