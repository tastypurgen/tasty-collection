import React from 'react';
import {
  Container, Form, Button, Jumbotron,
} from 'react-bootstrap';
import { useIntl } from 'react-intl';

import Input from '../../shared/components/Input';
import useForm from '../../shared/hooks/useForm';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../../utils/validator';

export default function SignUp() {
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

  const submitHandler = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(formState.inputs);
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
          <Button
            type="submit"
            variant="info"
            block
            disabled={!formState.isValid}
          >
            {intl({ id: 'NewItem.Submit' })}
          </Button>
        </Form>
      </Jumbotron>
    </Container>
  );
}
