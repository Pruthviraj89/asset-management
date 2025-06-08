import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { userLogin } from '../api/assetApi';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

function UserLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
    
    // Clear API error when user makes changes
    if (apiError) {
      setApiError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const user = await userLogin(formData);
        if (typeof user === 'string') {
          setApiError(user);
        } else {
          login(user);
          navigate('/');
        }
      } catch (err) {
        setApiError('Invalid email or password. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 login-bg p-0"
    >
      <video autoPlay muted loop className="login-video">
        <source src="/assets/login-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="login-overlay"></div>
      <Card className="login-card shadow-lg" style={{ maxWidth: '400px', zIndex: 1 }}>
        <Card.Body className="p-3">
          <div className="text-center mb-3">
            <FaSignInAlt className="text-primary fa-3x mb-3" />
            <h3>User Login</h3>
            <p className="text-muted">Access your assets securely</p>
          </div>
          {apiError && <Alert variant="danger" className="mb-3">{apiError}</Alert>}
          <Form onSubmit={handleSubmit} noValidate>
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
                isInvalid={!!errors.email}
                className="form-control-modern"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
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
                isInvalid={!!errors.password}
                className="form-control-modern"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 btn-modern"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : (
                <>
                  <FaSignInAlt className="me-2" /> Login
                </>
              )}
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