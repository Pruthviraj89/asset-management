import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createEmployee } from '../api/assetApi';
import { FaUserPlus, FaEnvelope, FaLock, FaBuilding, FaUser } from 'react-icons/fa';

function UserRegister() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    department: '',
    role: 'USER',
  });
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasCapital = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasMinLength = password.length >= 8;
    
    if (!hasCapital || !hasSpecial || !hasDigit || !hasMinLength) {
      let message = 'Password must contain: ';
      if (!hasMinLength) message += '8+ characters, ';
      if (!hasCapital) message += 'a capital letter, ';
      if (!hasDigit) message += 'a digit, ';
      if (!hasSpecial) message += 'a special character, ';
      return message.slice(0, -2); // Remove trailing comma and space
    }
    return '';
  };

  const validateEmail = (email) => {
    if (email.startsWith(' ')) {
      return 'Email cannot start with spaces';
    }
    if (email.includes(' ')) {
      return 'Email cannot contain spaces';
    }
    if (!email.includes('@')) {
      return 'Email must contain @';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate on change
    if (name === 'password') {
      setValidationErrors({
        ...validationErrors,
        password: validatePassword(value)
      });
    } else if (name === 'email') {
      setValidationErrors({
        ...validationErrors,
        email: validateEmail(value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate before submission
    const passwordError = validatePassword(formData.password);
    const emailError = validateEmail(formData.email);
    
    if (passwordError || emailError) {
      setValidationErrors({
        password: passwordError,
        email: emailError
      });
      return;
    }
    
    try {
      await createEmployee(formData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Email may already exist.');
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
            <FaUserPlus className="text-primary fa-3x mb-3" />
            <h3>User Registration</h3>
            <p className="text-muted">Join AssetFlow today</p>
          </div>
          {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>
                <FaUser className="me-2" /> First Name
              </Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
                className="form-control-modern"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>
                <FaUser className="me-2" /> Last Name
              </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
                className="form-control-modern"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>
                <FaEnvelope className="me-2" /> Email
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className="form-control-modern"
                isInvalid={!!validationErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.email}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Email must not contain spaces and include @
              </Form.Text>
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
                isInvalid={!!validationErrors.password}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.password}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Password must be at least 8 characters and include a capital letter, a digit, and a special character
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDepartment">
              <Form.Label>
                <FaBuilding className="me-2" /> Department
              </Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter department"
                className="form-control-modern"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 btn-modern">
              <FaUserPlus className="me-2" /> Register
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserRegister;