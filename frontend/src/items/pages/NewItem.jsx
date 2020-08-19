import React, { useCallback, useReducer } from 'react';
import {
  Button, Dropdown, DropdownButton,
} from 'react-bootstrap';

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
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
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

  const submitHandler = (event) => {
    console.log(formState.inputs);
    event.preventDefault();
  };

  return (
    <form className="place-form" onSubmit={submitHandler}>
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="input"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a description (at least 5 characters)"
        onInput={inputHandler}
      />
      <Input
        id="tags"
        element="input"
        label="Tags"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter at least 1 tag"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Submit
      </Button>
    </form>
  );
}
