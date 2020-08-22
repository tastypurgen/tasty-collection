import React from 'react';
import {
  Button, Form, Container,
} from 'react-bootstrap';

import { useIntl } from 'react-intl';
import Input from '../../shared/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validator';
import useForm from '../../shared/hooks/useForm';

export default function NewPlace() {
  const [formState, inputHandler] = useForm(
    {
      dropdown: {
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
    }, false,
  );

  const intl = useIntl().formatMessage;

  const submitHandler = (event) => {
    event.preventDefault();
    const splittedTags = formState.inputs.tags.value.split(',').map((tag) => tag.trim());

    // send to back later
    // eslint-disable-next-line no-console
    console.log({
      ...formState.inputs,
      tags: {
        value: splittedTags,
        isValid: true,
      },
    });
  };

  return (
    <Container style={{ maxWidth: '600px' }}>
      <Form onSubmit={submitHandler}>
        <Input
          id="dropdown"
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
        <Button
          type="submit"
          variant="info"
          block
          disabled={!formState.isValid}
        >
          {intl({ id: 'NewItem.Submit' })}
        </Button>
      </Form>
    </Container>
  );
}
