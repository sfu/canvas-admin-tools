import { Machine, assign } from 'xstate';

const INITIAL_STATE = {
  msg: '',
};

const doSubmit = data =>
  new Promise((resolve, reject) => {
    console.log({ data });
    setTimeout(() => {
      const dice = Math.floor(Math.random() * Math.floor(2));

      if (dice === 0) return resolve('OK');

      return reject('Not OK');
    }, 1000);
  });

export default Machine(
  {
    id: 'formMachine',
    initial: 'idle',
    context: INITIAL_STATE,
    states: {
      idle: {
        on: {
          SUBMIT: [
            {
              target: 'loading',
              cond: (_, { data }, meta) => {
                console.log(meta);
                return data.courseId !== '' && data.users !== '';
              },
            },
            {
              target: 'error',
              actions: assign({ msg: 'wharrrgarbl' }),
            },
          ],
        },
      },
      loading: {
        invoke: {
          id: 'doSubmit',
          src: (ctx, e) => doSubmit(e.data),
          onDone: {
            target: 'success',
            actions: assign({ msg: (_, { data }) => data }),
          },
          onError: {
            target: 'error',
            actions: assign({ msg: (_, { data }) => data }),
          },
        },
        entry: 'log',
        on: {
          SERVER_RESULT_SUCCESS: 'success',
          SERVER_RESULT_ERROR: 'error',
        },
      },
      error: {
        on: {
          SUBMIT: {
            target: 'loading',
            cond: (ctx, e) => e.data.courseId !== '' && e.data.users !== '',
          },
        },
      },
      success: {
        type: 'final',
        // actions: 'clear',
      },
    },
  },
  {
    actions: {
      typing: assign((ctx, { name, value }) => {
        return { [name]: value };
      }),
      log: (ctx, e) => console.log(ctx),
      // clear: assign(() => INITIAL_STATE),
    },
  }
);

// const submit = values => {
//   const { courseId, users } = values;
//   return fetch('/adduser', {
//     method: 'POST',
//     credentials: 'same-origin',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       courseId,
//       users: [...new Set(users.split(/[\s\,]/).filter(Boolean))],
//       role: 'teacher',
//     }),
//   });
// };
