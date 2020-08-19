import React, { useReducer, useEffect } from 'react';
import { validate } from '../utils/validator';

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
  element, id, type, placeholder, rows, label, errorText, validators, onInput,
}) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false,
  });

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
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  } else {
    component = (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  }

  return (
    <div
      className={`form ${!inputState.isValid && inputState.isTouched && 'form--invalid'}`}
    >
      <label htmlFor={id}>{label}</label>
      {component}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
}
