import React, { useContext } from 'react';
import {
  Navbar, Nav, Button, Image,
} from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './Header.scss';
import { AuthContext } from '../context/AuthContext';
import Search from './Search';

const assetsPath = `${process.env.PUBLIC_URL}/assets`;

export default function Header() {
  const auth = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Link to="/">
        <Navbar.Brand>
          <Image src={`${assetsPath}/logo.png`} style={{ width: '150px' }} />
        </Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {auth.isLoggedIn && (
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} exact to="/">
              <FormattedMessage id="Header.Home" />
            </Nav.Link>
            <Nav.Link as={NavLink} to={`/${auth.userId}/items`}>
              <FormattedMessage id="Header.MyItems" />
            </Nav.Link>
            <Nav.Link as={NavLink} to="/items/add">
              <FormattedMessage id="Header.AddItem" />
            </Nav.Link>
          </Nav>
        )}

        <Search />

        {!auth.isLoggedIn && (
          <div>
            <Link to="/signin">
              <Button className="ml-2" variant="outline-light">
                <FormattedMessage id="Header.SignIn" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="ml-2" variant="outline-light">
                <FormattedMessage id="Header.SignUp" />
              </Button>
            </Link>
          </div>
        )}

        {auth.isLoggedIn && (
          <Link className="m-1" to="/logout">
            <Button onClick={auth.logout} variant="outline-light">
              <FormattedMessage id="Header.Logout" />
            </Button>
          </Link>
        )}

      </Navbar.Collapse>
    </Navbar>
  );
}
