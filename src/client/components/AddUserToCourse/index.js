import React from 'react';
import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Message,
  TextArea,
} from 'semantic-ui-react';
import useFormValidation from '../../lib/useFormValidation';

import styles from './styles.module.css';

const validateInput = values => {
  const errors = {};

  // courseId is required and is a number
  if (!values.courseId) {
    errors.courseId = 'Course ID is required';
  } else if (!/^\d+$/.test(values.courseId)) {
    errors.courseId =
      'Course ID is invalid; use the numeric Canvas Course ID (e.g. 12345)';
  }

  if (!values.users) {
    errors.users = 'No Computing IDs were provided';
  }
  return errors;
};

const INITIAL_STATE = {
  courseId: '',
  users: '',
  role: 'teacher',
};

const FieldError = ({ error }) => <p style={{ color: 'CC0633' }}>{error}</p>;

const ServerResponse = ({ response }) => {
  if (!response) return null;

  switch (response.status) {
    case 'ok':
      return (
        <Message success icon>
          <Icon name="circle check" />
          <Message.Content>
            <Message.Header>Users Submitted</Message.Header>
          </Message.Content>
        </Message>
      );

    case 'error':
      return (
        <Message error icon>
          <Icon name="warning sign" />
          <Message.Content>
            <Message.Header>
              There were some errors with your submission. Please correct these
              and try again.
            </Message.Header>
            <p>{response.body.error}</p>
          </Message.Content>
        </Message>
      );

    default:
      return null;
  }
};

const AddUserToCourse = () => {
  const submit = values => {
    const { courseId, users } = values;
    return fetch('/adduser', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        courseId,
        users: [...new Set(users.split(/[\s\,]/).filter(Boolean))],
        role: 'teacher',
      }),
    });
  };

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    serverResponse,
    isSubmitting,
  } = useFormValidation(INITIAL_STATE, validateInput, submit);

  const roleOptions = [
    { key: 't', text: 'Teacher', value: 'teacher' },
    { key: 'ta', text: 'TA', value: 'ta' },
    { key: 's', text: 'Student', value: 'student' },
    { key: 'o', text: 'Observer', value: 'observer' },
    { key: 'd', text: 'Designer', value: 'designer' },
  ];

  return (
    <>
      <Header as="h2">Add Users to Course</Header>
      <ServerResponse response={serverResponse} />

      <Form onSubmit={handleSubmit}>
        <Form.Field
          id="courseId"
          name="courseId"
          control={Input}
          label="Course ID"
          placeholder="e.g. 12345"
          onChange={handleChange}
          value={values.courseId}
        />
        <FieldError error={errors.courseId} />

        <Form.Field
          control={TextArea}
          label="Users to Add to Course"
          placeholder="Computing IDs to add to course. When adding multiple users, use a comma or line break to separate users."
          onChange={handleChange}
          id="users"
          name="users"
          value={values.users}
        />
        <FieldError error={errors.users} />
        <Form.Dropdown
          selection
          options={roleOptions}
          id="role"
          name="role"
          label="Role"
          defaultValue={values.role}
          onChange={handleChange}
        />

        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddUserToCourse;
