import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function EmployeeForm({ open, onClose, onSubmit, employee }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (employee) {
      setFormData(employee);
      // Clear validation errors when editing an existing employee
      setValidationErrors({
        firstName: '',
        lastName: '',
        email: '',
      });
    }
  }, [employee]);

  const validateName = (value, field) => {
    if (value.includes('  ')) {
      return `${field} cannot contain multiple spaces`;
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
    if (name === 'firstName' || name === 'lastName') {
      setValidationErrors({
        ...validationErrors,
        [name]: validateName(value, name === 'firstName' ? 'First name' : 'Last name')
      });
    } else if (name === 'email') {
      setValidationErrors({
        ...validationErrors,
        email: validateEmail(value)
      });
    }
  };
  
  const handleSubmit = () => {
    try {
      setError(null);
      
      // Validate all fields before submission
      const firstNameError = validateName(formData.firstName, 'First name');
      const lastNameError = validateName(formData.lastName, 'Last name');
      const emailError = validateEmail(formData.email);
      
      if (firstNameError || lastNameError || emailError) {
        setValidationErrors({
          firstName: firstNameError,
          lastName: lastNameError,
          email: emailError
        });
        return;
      }
      
      onSubmit(formData);
      setFormData({ firstName: '', lastName: '', email: '', department: '' });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save employee. Please check inputs.");
    }
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{employee ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              isInvalid={!!validationErrors.firstName}
              required
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              isInvalid={!!validationErrors.lastName}
              required
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.lastName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!validationErrors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.email}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Email must contain @ and cannot contain spaces
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EmployeeForm;