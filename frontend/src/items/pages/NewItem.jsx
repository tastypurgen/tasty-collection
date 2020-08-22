import React, { useCallback, useReducer } from 'react';
import {
  Button, Form, Container,
} from 'react-bootstrap';

import { useIntl } from 'react-intl';
import Input from '../../shared/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validator';

const formReducer = (state, action) => {
  let formIsValid = true;
  switch (action.type) {
    case 'INPUT_CHANGE':
      Object.keys(state.inputs).forEach((inputId) => {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      });
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

export default function NewPlace() {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
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
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value,
      isValid,
      inputId: id,
    });
  }, []);

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
