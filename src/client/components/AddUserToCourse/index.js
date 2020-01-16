/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import formMachine from './formMachine';
import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Message,
  TextArea,
} from 'semantic-ui-react';

// const validateInput = values => {
//   const errors = {};

//   // coursed is required and is a number
//   if (!values.courseId) {
//     errors.courseId = 'Course ID is required';
//   } else if (!/^\d+$/.test(values.courseId)) {
//     errors.courseId =
//       'Course ID is invalid; use the numeric Canvas Course ID (e.g. 12345)';
//   }

//   if (!values.users) {
//     errors.users = 'No Computing IDs were provided';
//   }
//   return errors;
// };

// const ServerResponse = ({ response }) => {
//   if (!response) return null;

//   switch (response.status) {
//     case 'ok':
//       return (
//         <Message success icon>
//           <Icon name="circle check" />
//           <Message.Content>
//             <Message.Header>Users Submitted</Message.Header>
//           </Message.Content>
//         </Message>
//       );

//     case 'error':
//       return (
//         <Message error icon>
//           <Icon name="warning sign" />
//           <Message.Content>
//             <Message.Header>
//               There were some errors with your submission. Please correct these
//               and try again.
//             </Message.Header>
//             <p>{response.body.error}</p>
//           </Message.Content>
//         </Message>
//       );

//     default:
//       return null;
//   }
// };

const AddUserToCourse = () => {
  const [machine, send] = useMachine(formMachine, { devTools: true });
  const [form, updateForm] = useState({
    courseId: '',
    users: '',
    role: 'teacher',
  });

  const handleChange = (e, { name, value }) => {
    updateForm({ ...form, [name]: value });
  };

  const roleOptions = [
    { key: 't', text: 'Teacher', value: 'teacher' },
    { key: 'ta', text: 'TA', value: 'ta' },
    { key: 's', text: 'Student', value: 'student' },
    { key: 'o', text: 'Observer', value: 'observer' },
    { key: 'd', text: 'Designer', value: 'designer' },
  ];
  console.log(machine);
  return (
    <>
      <Header as="h2">Add Users to Course</Header>

      {machine.matches('error') ? (
        <p>
          {machine.context.msg
            ? machine.context.msg
            : 'You must fill out all the form fields.'}
        </p>
      ) : null}
      {machine.matches('success') ? <p>{machine.context.msg}</p> : null}

      <Form
        onSubmit={e => {
          e.preventDefault();
          send({
            type: 'SUBMIT',
            data: {
              ...form,
            },
          });
        }}
      >
        <Form.Field
          id="courseId"
          name="courseId"
          control={Input}
          label="Course ID"
          placeholder="e.g. 12345"
          onChange={handleChange}
          value={form.courseId}
        />
        {/* <FieldError error={errors.courseId} /> */}

        <Form.Field
          control={TextArea}
          label="Users to Add to Course"
          placeholder="Computing IDs to add to course. When adding multiple users, use a comma or line break to separate users."
          onChange={handleChange}
          id="users"
          name="users"
          value={form.users}
        />
        {/* <FieldError error={errors.users} /> */}
        <Form.Dropdown
          selection
          options={roleOptions}
          id="role"
          name="role"
          label="Role"
          defaultValue={form.role}
          onChange={handleChange}
        />

        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default AddUserToCourse;
