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

export default function SignUp() {
  const {
    isLoading, error, sendRequest,
  } = useHttpClient();

  const auth = useContext(AuthContext);
  const intl = useIntl().formatMessage;

  const [formState, inputHandler] = useForm(
    {
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
      const responeData = await sendRequest('http://localhost:5501/api/users/signin', 'POST', JSON.stringify({
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      }), {
        'Content-Type': 'application/json',
      });

      auth.login(responeData.userId, responeData.token);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err: ', err);
    }
  };

  return (
    <Container className="d-flex justify-content-center" style={{ maxWidth: '600px' }}>
      <Jumbotron style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center">Sign In</h2>
        <Form style={{ width: '100%', maxWidth: '600px' }} onSubmit={submitHandler}>
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
          {error && (
            <Alert variant="info">
              Wrong email/password
            </Alert>
          )}
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
