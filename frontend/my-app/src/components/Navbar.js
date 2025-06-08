import React, { useContext } from 'react';
import { Navbar as BootstrapNavbar, Nav, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';

function AdminNavbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BootstrapNavbar bg={theme === 'dark' ? 'dark' : 'primary'} variant="dark" expand="lg" className="mb-4 shadow-sm">
      <BootstrapNavbar.Brand as={Link} to="/" className="ms-3">
        <i className="fas fa-laptop-code me-2"></i>AssetFlow
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className="mx-2">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/assets" className="mx-2">Assets</Nav.Link>
          <Nav.Link as={Link} to="/employees" className="mx-2">Employees</Nav.Link>
          <Nav.Link as={Link} to="/assignments" className="mx-2">Assignments</Nav.Link>
        </Nav>
        <Nav className="align-items-center">
          <Nav.Link className="text-white mx-2">
            <i className="fas fa-user me-1"></i>Welcome, {auth.user?.firstName || 'Admin'}
          </Nav.Link>
          <Nav.Link onClick={handleLogout} className="text-white mx-2">
            <FaSignOutAlt className="me-1" />Logout
          </Nav.Link>
          <Form className="d-flex align-items-center mx-3">
            <Form.Check
              type="switch"
              id="theme-switch"
              label={<i className={theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'} />}
              checked={theme === 'dark'}
              onChange={toggleTheme}
              className="text-white"
            />
          </Form>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

export default AdminNavbar;