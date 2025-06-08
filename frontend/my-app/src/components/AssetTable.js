import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

function AssetTable({ assets, onDelete }) {
  return (
    <Table striped bordered hover responsive className="table-modern">
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
              <Button variant="outline-primary" size="sm" className="me-2">
                <FaEdit />
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(asset.assetId)}
              >
                <FaTrash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AssetTable;