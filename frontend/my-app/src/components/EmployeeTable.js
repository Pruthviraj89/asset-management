import React from 'react';
import { Table, Button } from 'react-bootstrap';

function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
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
              <Button variant="danger" onClick={() => onDelete(employee.employeeId)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default EmployeeTable;