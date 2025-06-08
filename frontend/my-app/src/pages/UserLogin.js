import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { userLogin } from '../api/assetApi';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

function UserLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await userLogin(formData);
      if (typeof user === 'string') {
        setError(user);
      } else {
        login(user);
        navigate('/');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 login-bg p-0"
    >
      <div className="login-overlay"></div>
      <Card className="login-card shadow-lg" style={{ maxWidth: '400px', zIndex: 1 }}>
        <Card.Body className="p-3">
          <div className="text-center mb-3">
            <FaSignInAlt className="text-primary fa-3x mb-3" />
            <h3>User Login</h3>
            <p className="text-muted">Access your assets securely</p>
          </div>
          {error && <Alert variant="danger" className="mb-3">error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>
                <FaUser className="me-2" /> Email
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className="form-control-modern"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>
                <FaLock className="me-2" /> Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="form-control-modern"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 btn-modern">
              <FaSignInAlt className="me-2" /> Login
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserLogin;