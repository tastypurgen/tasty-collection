import React from 'react';
import { Form } from 'react-bootstrap';
import { useIntl } from 'react-intl';

export default function LocalePicker({ selectedLocale, onLocaleChange }) {
  const intl = useIntl().formatMessage;
  return (
    <Form onChange={onLocaleChange}>
      <Form.Control defaultValue={selectedLocale} as="select" custom>
        <option value="en">
          {intl({ id: 'localePicker.enLang' })}
        </option>
        <option value="ru">
          {intl({ id: 'localePicker.ruLang' })}
        </option>
      </Form.Control>
    </Form>
  );
}
