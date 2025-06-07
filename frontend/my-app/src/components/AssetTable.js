import React, { useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

function AssetTable({ assets, onEdit, onDelete }) {
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
        setError('Cannot delete asset because it is already assigned to an employee');
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
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Serial Number</th>
            <th>Description</th>
            <th>Purchase Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.assetId}>
              <td>{asset.assetId}</td>
              <td>{asset.assetType}</td>
              <td>{asset.serialNumber}</td>
              <td>{asset.description}</td>
              <td>{asset.purchaseDate}</td>
              <td>{asset.status}</td>
              <td>
                <Button variant="primary" onClick={() => onEdit(asset)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(asset.assetId)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default AssetTable;