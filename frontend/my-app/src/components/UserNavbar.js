import React, { useContext } from 'react';
import { Navbar as BootstrapNavbar, Nav, Form, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { FaSignOutAlt, FaSun, FaMoon, FaLaptop, FaSearch } from 'react-icons/fa';

function UserNavbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BootstrapNavbar
      bg={theme === 'dark' ? 'dark' : 'primary'}
      variant="dark"
      expand="lg"
      className="navbar-gradient shadow-sm"
    >
      <Container fluid className="p-0">
        <BootstrapNavbar.Brand as={Link} to="/" className="ms-3">
          <FaLaptop className="me-2" /> AssetFlow
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="mx-3">
              <i className="fas fa-box me-1"></i> My Assets
            </Nav.Link>
            <Nav.Link href="#" className="mx-3 text-white">
              <FaSearch className="me-1" /> Search
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            <Nav.Link className="text-white mx-3">
              <i className="fas fa-user me-1"></i>
              <span className="badge bg-secondary ms-1">
                {auth.user?.firstName || 'User'}
              </span>
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="text-white mx-3">
              <FaSignOutAlt className="me-1" /> Logout
            </Nav.Link>
            <Form className="d-flex align-items-center mx-3">
              <Form.Check
                type="switch"
                id="theme-switch"
                label={theme === 'dark' ? <FaMoon /> : <FaSun />}
                checked={theme === 'dark'}
                onChange={toggleTheme}
                className="text-white"
              />
            </Form>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default UserNavbar;