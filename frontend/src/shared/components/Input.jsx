import React, { useReducer, useEffect } from 'react';
import { FormControl, Form, Alert } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import '@github/markdown-toolbar-element';
import { validate } from '../../utils/validator';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

export default function Input({
  element, id, type, placeholder, rows, label, errorText,
  validators, onInput, initialValue, initialValid,
}) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isTouched: false,
    isValid: initialValid || false,
  });

  const intl = useIntl().formatMessage;
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({ type: 'CHANGE', val: event.target.value, validators });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  let component;
  if (element === 'input') {
    component = (
      <Form.Group>
        <FormControl
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      </Form.Group>
    );
  } else if (element === 'select') {
    component = (
      <Form.Group>
        <FormControl
          as="select"
          id={id}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        >
          <option value="">{intl({ id: 'NewItem.Select' })}</option>
          <option value="film">{intl({ id: 'NewItem.Film' })}</option>
          <option value="book">{intl({ id: 'NewItem.Book' })}</option>
          <option value="game">{intl({ id: 'NewItem.Game' })}</option>
          <option value="food">{intl({ id: 'NewItem.Food' })}</option>
        </FormControl>
      </Form.Group>
    );
  } else {
    component = (
      <>
        <br />
        <markdown-toolbar
          style={{
            color: 'white', fontSize: '1.2rem', background: '#757575', borderRadius: '5px', padding: '0 2px',
          }}
          for={id}
        >
          <md-bold>B </md-bold>
          <md-header>H </md-header>
          <md-italic>I </md-italic>
          <md-quote>Q </md-quote>
          <md-code>C </md-code>
          <md-link>L </md-link>
          <md-image>I </md-image>
          <md-unordered-list>UL </md-unordered-list>
          <md-ordered-list>OL</md-ordered-list>
        </markdown-toolbar>

        <Form.Group>
          <FormControl
            as="textarea"
            id={id}
            rows={rows || 7}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
          />

        </Form.Group>
      </>
    );
  }

  return (
    <div
      className={`form ${!inputState.isValid && inputState.isTouched && 'form--invalid'}`}
    >
      <label htmlFor={id}>{label}</label>
      {component}
      {!inputState.isValid && inputState.isTouched
        && (
          <Alert variant="danger">
            {errorText}
          </Alert>
        )}
    </div>
  );
}
