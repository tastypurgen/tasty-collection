import React from 'react';
import { Form } from 'react-bootstrap';
import { useIntl } from 'react-intl';

export default function LocalePicker({ selectedLocale, onLocaleChange }) {
  const intl = useIntl().formatMessage;
  return (
    <Form style={{ maxWidth: '100px' }} onChange={onLocaleChange}>
      <Form.Control defaultValue={selectedLocale} as="select" custom>
        <option value="en">
          {intl({ id: 'LocalePicker.EnLang' })}
        </option>
        <option value="ru">
          {intl({ id: 'LocalePicker.RuLang' })}
        </option>
      </Form.Control>
    </Form>
  );
}
