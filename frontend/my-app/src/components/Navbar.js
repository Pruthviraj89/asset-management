import React, { useContext } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function Navigation() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'primary'} variant="dark" expand="lg" className="mb-3">
      <Navbar.Brand as={Link} to="/">AssetFlow</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/assets">Assets</Nav.Link>
          <Nav.Link as={Link} to="/employees">Employees</Nav.Link>
          <Nav.Link as={Link} to="/assignments">Assignments</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
        <Form className="d-flex align-items-center">
          <Form.Check
            type="switch"
            id="theme-switch"
            label={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            checked={theme === 'dark'}
            onChange={toggleTheme}
            className="text-white"
          />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;