import React , { useState } from 'react';
import { Table, Button, Alert  } from 'react-bootstrap';

function EmployeeTable({ employees, onEdit, onDelete }) {
const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      if (errorMessage.includes('foreign key constraint fails')) {
        setError('Cannot delete asset because it is assigned to an employee');
      } else {
        setError('Cannot delete asset because device is  assigned to an employee');
      }
    }
  };




  return (
    <>

    {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.employeeId}>
            <td>{employee.employeeId}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.email}</td>
            <td>{employee.department}</td>
            <td>
              <Button variant="primary" onClick={() => onEdit(employee)} className="me-2">Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(employee.employeeId)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

    </>
  );
}

export default EmployeeTable;