import { useEffect, useState } from 'react';

function useFormValidation(initialState, validate, submit) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState(null);
  const [serverErrors, setServerErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        (async values => {
          const response = await submit(values);
          setSubmitting(false);
          const { status } = response;
          const body = await response.json();
          setServerResponse({
            status: status === 200 ? 'ok' : 'error',
            body,
          });
        })(values);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(e, { name, value }) {
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    const noErrors = Object.keys(errors).length === 0;

    setErrors(validationErrors);
    setServerResponse(null);
    setSubmitting(true);
  }

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    serverResponse,
    isSubmitting,
  };
}

export default useFormValidation;
