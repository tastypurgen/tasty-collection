import React from 'react';

import './Footer.scss';
import { Navbar } from 'react-bootstrap';
import ThemePicker from './ThemePicker';
import LocalePicker from './LocalePicker';
import langImg from './lang.png';

export default function Footer({ selectedLocale, onLocaleChange }) {
  return (
    <Navbar className="footer" bg="dark" variant="dark" expand="lg">
      &#169; 2020

      <ThemePicker />
      <div className="language">
        <span><img src={langImg} alt="language" /></span>
        <LocalePicker
          selectedLocale={selectedLocale}
          onLocaleChange={onLocaleChange}
        />
      </div>

    </Navbar>
  );
}
