import React, { useContext } from 'react';
import {
  Container, Form, Button, Jumbotron, Spinner, Alert,
} from 'react-bootstrap';
import { useIntl } from 'react-intl';

import Input from '../../shared/components/Input';
import useForm from '../../shared/hooks/useForm';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../../utils/validator';
import { AuthContext } from '../../shared/context/AuthContext';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import ImageUploader from '../../shared/components/ImageUploader';

export default function SignUp() {
  const auth = useContext(AuthContext);
  const intl = useIntl().formatMessage;
  const {
    isLoading, error, sendRequest,
  } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false,
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', formState.inputs.name.value);
      formData.append('email', formState.inputs.email.value);
      formData.append('password', formState.inputs.password.value);
      formData.append('image', formState.inputs.image.value);
      const responeData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        'POST',
        formData,
      );

      auth.login(responeData.userId, responeData.token);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err: ', err);
    }
  };

  return (
    <Container className="d-flex justify-content-center" style={{ maxWidth: '600px' }}>
      <Jumbotron style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center">Sign Up</h2>
        <Form style={{ width: '100%', maxWidth: '600px' }} onSubmit={submitHandler}>
          <ImageUploader id="image" center onInput={inputHandler} />
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Invalid Name"
            onInput={inputHandler}
            initialValue={formState.inputs.name.value}
            initialValid={formState.inputs.name.isValid}
          />
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            errorText="Invalid Email"
            onInput={inputHandler}
            initialValue={formState.inputs.email.value}
            initialValid={formState.inputs.email.isValid}
          />
          {error && (
            <Alert variant="info">
              The email must be unique
            </Alert>
          )}
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Invalid Password"
            onInput={inputHandler}
            initialValue={formState.inputs.password.value}
            initialValid={formState.inputs.password.isValid}
          />
          {isLoading
            ? (
              <Button
                variant="info"
                block
                disabled
              >
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
            )
            : (
              <Button
                type="submit"
                variant="info"
                block
                disabled={!formState.isValid}
              >
                {intl({ id: 'NewItem.Submit' })}
              </Button>
            )}

        </Form>
      </Jumbotron>
    </Container>
  );
}
