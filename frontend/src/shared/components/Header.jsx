import React from 'react';
import {
  Navbar, Nav, Form, FormControl, Button, Image,
} from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import LocalePicker from './LocalePicker';
import ThemePicker from './ThemePicker';

const assetsPath = `${process.env.PUBLIC_URL}/assets`;

export default function Header({ selectedLocale, onLocaleChange }) {
  const intl = useIntl();

  return (
    <Navbar className="mb-3" bg="dark" variant="dark" expand="lg">
      <Link to="/">
        <Navbar.Brand>
          <Image src={`${assetsPath}/logo.png`} style={{ width: '150px' }} />
        </Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} exact to="/">
            <FormattedMessage id="Header.Home" />
          </Nav.Link>
          <Nav.Link as={NavLink} to="/u1/items">
            <FormattedMessage id="Header.MyItems" />
          </Nav.Link>
          <Nav.Link as={NavLink} to="/items/add">
            <FormattedMessage id="Header.AddItem" />
          </Nav.Link>
        </Nav>

        <ThemePicker />

        <LocalePicker
          selectedLocale={selectedLocale}
          onLocaleChange={onLocaleChange}
        />

        <Form inline>
          <FormControl
            type="text"
            placeholder={intl.formatMessage({ id: 'Header.SearchPlaceholder' })}
            className="mr-sm-2"
          />
          <Button variant="outline-info">
            <FormattedMessage id="Header.SearchBtn" />
          </Button>

          <Link to="/signin">
            <Button variant="outline-light">
              {/* <FormattedMessage id="Header.SearchBtn" /> */}
              Sign In
            </Button>
          </Link>

          <Link to="/signup">
            <Button variant="outline-light">
              {/* <FormattedMessage id="Header.SearchBtn" /> */}
              Sign Up
            </Button>
          </Link>

        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
