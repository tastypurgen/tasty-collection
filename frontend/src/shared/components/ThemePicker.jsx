/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import './ThemePicker.scss';

export default function ThemePicker() {
  const [darkTheme, setDarkTheme] = useState(
    (localStorage.DARK_THEME && JSON.parse(localStorage.DARK_THEME)) || false,
  );

  const toggleDarkTheme = () => {
    if (localStorage.DARK_THEME === 'true') localStorage.DARK_THEME = false;
    else localStorage.DARK_THEME = true;
    setDarkTheme(!darkTheme);
  };

  return (
    <div
      className="theme-switcher"
      onChange={toggleDarkTheme}
    >
      {darkTheme && (
        <Helmet>
          <link rel="stylesheet" href="/dark-theme.css" />
        </Helmet>
      )}

      <input defaultChecked={darkTheme} type="checkbox" className="checkbox" id="check" />
      <label className="label" htmlFor="check">
        <i className="fas fa-moon" />
        <i className="fas fa-sun" />
        <div className="ball" />
      </label>
    </div>
  );
}
