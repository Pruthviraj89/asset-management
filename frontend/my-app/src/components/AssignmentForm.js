import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllEmployees, getAvailableAssets } from '../api/assetApi.js';

function AssignmentForm({ open, onClose, onSubmit, assignment }) {
  const [formData, setFormData] = useState({
    assetId: '',
    employeeId: '',
    assignedDate: '',
    returnDate: '',
    notes: '',
  });
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetsData = await getAvailableAssets();
        const employeesData = await getAllEmployees();
        setAssets(assetsData);
        setEmployees(employeesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (assignment) {
      setFormData({
        assetId: assignment.asset?.assetId || '',
        employeeId: assignment.employee?.employeeId || '',
        assignedDate: assignment.assignedDate || '',
        returnDate: assignment.returnDate || '',
        notes: assignment.notes || '',
      });
    } else {
      // Reset form when adding a new assignment
      setFormData({
        assetId: '',
        employeeId: '',
        assignedDate: '',
        returnDate: '',
        notes: '',
      });
    }
  }, [assignment]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const assignment = {
      asset: { assetId: parseInt(formData.assetId) },
      employee: { employeeId: parseInt(formData.employeeId) },
      assignedDate: formData.assignedDate,
      returnDate: formData.returnDate || null,
      notes: formData.notes,
    };
    onSubmit(assignment);
    setFormData({
      assetId: '',
      employeeId: '',
      assignedDate: '',
      returnDate: '',
      notes: '',
    });
    onClose();
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{assignment ? 'Edit Assignment' : 'Add Assignment'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Asset</Form.Label>
            <Form.Select name="assetId" value={formData.assetId} onChange={handleChange}>
              <option value="">Select Asset</option>
              {assets.map((asset) => (
                <option key={asset.assetId} value={asset.assetId}>
                  {asset.assetType} ({asset.serialNumber})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Employee</Form.Label>
            <Form.Select name="employeeId" value={formData.employeeId} onChange={handleChange}>
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.employeeId} value={employee.employeeId}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Assigned Date</Form.Label>
            <Form.Control
              type="date"
              name="assignedDate"
              value={formData.assignedDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Return Date</Form.Label>
            <Form.Control
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AssignmentForm;