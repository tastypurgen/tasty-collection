import React from 'react';
import {
  Navbar, Nav, Form, FormControl, Button,
} from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

export default function Header() {
  return (
    <Navbar className="mb-3" bg="dark" variant="dark" expand="md">
      <Link to="/">
        <Navbar.Brand>TastyCollection</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/ul/items">My Items</Nav.Link>
          <Nav.Link as={NavLink} to="/items/add">Add Item</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
