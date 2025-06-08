import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

function AssetForm({ open, onClose, onSubmit, asset }) {
  const [formData, setFormData] = useState({
    assetType: "",
    serialNumber: "",
    description: "",
    purchaseDate: "",
    status: "Unassigned",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (asset) {
      setFormData({
        assetType: asset.assetType || "",
        serialNumber: asset.serialNumber || "",
        description: asset.description || "",
        purchaseDate: asset.purchaseDate || "",
        status: asset.status || "Unassigned",
      });
    }
  }, [asset]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      await onSubmit(formData);
      setFormData({
        assetType: "",
        serialNumber: "",
        description: "",
        purchaseDate: "",
        status: "Unassigned",
      });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save asset. Please check inputs.");
    }
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{asset ? "Edit Asset" : "Add Asset"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Asset Type</Form.Label>
            <Form.Control
              type="text"
              name="assetType"
              value={formData.assetType}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Serial Number</Form.Label>
            <Form.Control
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Purchase Date</Form.Label>
            <Form.Control
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled
            >
              {["Unassigned", "Assigned"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Form.Select>
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

export default AssetForm;