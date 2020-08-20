import React from 'react';
import {
  Navbar, Nav, Form, FormControl, Button, Image,
} from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';

const assetsPath = `${process.env.PUBLIC_URL}/assets`;

export default function Header() {
  const intl = useIntl();

  return (
    <Navbar className="mb-3" bg="dark" variant="dark" expand="md">
      <Link to="/">
        <Navbar.Brand>
          <Image src={`${assetsPath}/logo.png`} style={{ width: '150px' }} />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} exact to="/">
            <FormattedMessage id="header.home" />
          </Nav.Link>
          <Nav.Link as={NavLink} to="/u1/items">
            <FormattedMessage id="header.myItems" />
          </Nav.Link>
          <Nav.Link as={NavLink} to="/items/add">
            <FormattedMessage id="header.addItem" />
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder={intl.formatMessage({ id: 'header.searchPlaceholder' })} className="mr-sm-2" />
          <Button variant="outline-info">
            <FormattedMessage id="header.searchBtn" />
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
