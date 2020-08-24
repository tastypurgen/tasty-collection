/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import './ThemePicker.scss';

export default function ThemePicker() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className="theme-switcher" onChange={() => setDarkTheme(!darkTheme)}>

      {darkTheme && (
        <Helmet>
          <link rel="stylesheet" href="/dark-theme.css" />
        </Helmet>
      )}

      <input type="checkbox" className="checkbox" id="check" />
      <label className="label" htmlFor="check">
        <i className="fas fa-moon" />
        <i className="fas fa-sun" />
        <div className="ball" />
      </label>
    </div>
  );
}
