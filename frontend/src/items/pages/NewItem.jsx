import React, { useContext } from 'react';
import {
  Button, Form, Container, Spinner, Alert, Jumbotron,
} from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validator';
import useForm from '../../shared/hooks/useForm';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import { AuthContext } from '../../shared/context/AuthContext';
import ImageUploader from '../../shared/components/ImageUploader';

export default function NewPlace() {
  const auth = useContext(AuthContext);
  const {
    isLoading, error, sendRequest,
  } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      type: {
        value: '',
        isValid: false,
      },
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      tags: {
        value: [],
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    }, false,
  );

  const intl = useIntl().formatMessage;
  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    const splittedTags = formState.inputs.tags.value.split(',').map((tag) => tag.trim());
    const currentType = formState.inputs.type.value;
    try {
      const formData = new FormData();
      formData.append('type', currentType);
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('tags', splittedTags);
      formData.append('image', formState.inputs.image.value);

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/items`,
        'POST',
        formData,
        { Authorization: `Bearer ${auth.currentToken}` },
      );

      history.push('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <Container style={{ maxWidth: '600px' }}>
      <Jumbotron style={{ width: '100%', maxWidth: '600px' }}>
        <Form onSubmit={submitHandler}>
          <ImageUploader id="image" center onInput={inputHandler} />

          <Input
            id="type"
            element="select"
            label={intl({ id: 'NewItem.Collection' })}
            validators={[VALIDATOR_REQUIRE()]}
            errorText={intl({ id: 'NewItem.CollectionError' })}
            onInput={inputHandler}
          />
          <Input
            id="title"
            element="input"
            type="text"
            label={intl({ id: 'NewItem.Title' })}
            validators={[VALIDATOR_REQUIRE()]}
            errorText={intl({ id: 'NewItem.TitleError' })}
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="textarea"
            label={intl({ id: 'NewItem.Description' })}
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText={intl({ id: 'NewItem.DescriptionError' })}
            onInput={inputHandler}
          />
          <Input
            id="tags"
            element="input"
            label={intl({ id: 'NewItem.Tags' })}
            validators={[VALIDATOR_REQUIRE()]}
            errorText={intl({ id: 'NewItem.TagsError' })}
            onInput={inputHandler}
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
          {error && (
            <Alert variant="info">
              Please check your data
            </Alert>
          )}
        </Form>
      </Jumbotron>
    </Container>
  );
}
