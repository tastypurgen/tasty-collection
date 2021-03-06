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
      image: {
        value: '',
        isValid: false,
      },
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

      auth.login(responeData.userId, responeData.isAdmin, responeData.token);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err: ', err);
    }
  };

  return (
    <Container className="d-flex justify-content-center" style={{ maxWidth: '600px' }}>
      <Jumbotron style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center">{intl({ id: 'SignUp.SignUp' })}</h2>
        <Form style={{ width: '100%', maxWidth: '600px' }} onSubmit={submitHandler}>
          <ImageUploader id="image" center onInput={inputHandler} />

          <Input
            id="name"
            element="input"
            type="text"
            label={intl({ id: 'SignUp.Name' })}
            validators={[VALIDATOR_REQUIRE()]}
            errorText={intl({ id: 'SignUp.InvalidName' })}
            onInput={inputHandler}
            initialValue={formState.inputs.name.value}
            initialValid={formState.inputs.name.isValid}
          />
          <Input
            id="email"
            element="input"
            type="email"
            label={intl({ id: 'SignUp.Email' })}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            errorText={intl({ id: 'SignUp.InvalidEmail' })}
            onInput={inputHandler}
            initialValue={formState.inputs.email.value}
            initialValid={formState.inputs.email.isValid}
          />
          {error && (
            <Alert variant="info">
              {intl({ id: 'SignUp.Uniq' })}
            </Alert>
          )}
          <Input
            id="password"
            element="input"
            type="password"
            label={intl({ id: 'SignUp.Password' })}
            validators={[VALIDATOR_REQUIRE()]}
            errorText={intl({ id: 'SignUp.InvalidPassword' })}
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
                {intl({ id: 'SignUp.Loading' })}
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
