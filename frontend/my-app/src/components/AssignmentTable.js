import React from 'react';
import { Table, Button } from 'react-bootstrap';

function AssignmentTable({ assignments, onEdit, onDelete }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Asset</th>
          <th>Employee</th>
          <th>Assigned Date</th>
          <th>Return Date</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map((assignment) => (
          <tr key={assignment.assignmentId}>
            <td>{assignment.assignmentId}</td>
            <td>{assignment.asset?.assetType} ({assignment.asset?.serialNumber})</td>
            <td>{assignment.employee?.firstName} {assignment.employee?.lastName}</td>
            <td>{assignment.assignedDate}</td>
            <td>{assignment.returnDate || 'N/A'}</td>
            <td>{assignment.notes || 'N/A'}</td>
            <td>
              <Button variant="primary" onClick={() => onEdit(assignment)} className="me-2">Edit</Button>
              <Button variant="danger" onClick={() => onDelete(assignment.assignmentId)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AssignmentTable;