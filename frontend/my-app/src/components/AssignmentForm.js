import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllAssets,getByAvailable } from '../api/assetApi';
import { getAllEmployees } from '../api/employeeApi';

function AssignmentForm({ open, onClose, onSubmit, assignment }) {
  const [formData, setFormData] = useState({
    asset: { assetId: '' },
    employee: { employeeId: '' },
    assignedDate: '',
    returnDate: '',
    notes: '',
  });
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);

 useEffect(() => {
  if (assignment) {
    setFormData({
      asset: { assetId: assignment.asset?.assetId || '' },
      employee: { employeeId: assignment.employee?.employeeId || '' },
      assignedDate: assignment.assignedDate || '',
      returnDate: assignment.returnDate || '',
      notes: assignment.notes || '',
    });
  } else {
    setFormData({
      asset: { assetId: '' },
      employee: { employeeId: '' },
      assignedDate: '',
      returnDate: '',
      notes: '',
    });
  }

  fetchData();
}, [assignment]); // << ADD refreshKey here


  const fetchData = async () => {
    const assetsData = await getByAvailable();
    const employeesData = await getAllEmployees();
    setAssets(assetsData);
    setEmployees(employeesData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'assetId') {
      setFormData({ ...formData, asset: { assetId: value } });
    } else if (name === 'employeeId') {
      setFormData({ ...formData, employee: { employeeId: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
  await onSubmit(formData); // Wait for submission to complete
  setFormData({ asset: { assetId: '' }, employee: { employeeId: '' }, assignedDate: '', returnDate: '', notes: '' });
  await fetchData(); // Re-fetch updated list of available assets
  onClose(); // Then close the modal
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
            <Form.Select name="assetId" value={formData.asset.assetId} onChange={handleChange}>
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
            <Form.Select name="employeeId" value={formData.employee.employeeId} onChange={handleChange}>
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
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AssignmentForm;