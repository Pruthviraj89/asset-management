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
  const [validationErrors, setValidationErrors] = useState({
    assetType: '',
    serialNumber: '',
    description: ''
  });

  useEffect(() => {
    if (asset) {
      setFormData({
        assetType: asset.assetType || "",
        serialNumber: asset.serialNumber || "",
        description: asset.description || "",
        purchaseDate: asset.purchaseDate || "",
        status: asset.status || "Unassigned",
      });
      // Clear validation errors when editing an existing asset
      setValidationErrors({
        assetType: '',
        serialNumber: '',
        description: ''
      });
    }
  }, [asset]);

  const validateAssetType = (value) => {
    if (value.startsWith(' ')) {
      return 'Asset type cannot start with spaces';
    }
    if (value.includes(' ')) {
      return 'Asset type cannot contain spaces';
    }
    if (value !== value.toLowerCase()) {
      return 'Asset type must be lowercase';
    }
    return '';
  };

  const validateSerialNumber = (value) => {
    if (value.length > 12) {
      return 'Serial number must be 12 characters or less';
    }
    if (!/^[a-zA-Z0-9]*$/.test(value)) {
      return 'Serial number must be alphanumeric';
    }
    return '';
  };

  const validateDescription = (value) => {
    if (value.length > 500) {
      return 'Description must be 500 characters or less';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate on change
    if (name === 'assetType') {
      setValidationErrors({
        ...validationErrors,
        assetType: validateAssetType(value)
      });
    } else if (name === 'serialNumber') {
      setValidationErrors({
        ...validationErrors,
        serialNumber: validateSerialNumber(value)
      });
    } else if (name === 'description') {
      setValidationErrors({
        ...validationErrors,
        description: validateDescription(value)
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      
      // Validate all fields before submission
      const assetTypeError = validateAssetType(formData.assetType);
      const serialNumberError = validateSerialNumber(formData.serialNumber);
      const descriptionError = validateDescription(formData.description);
      
      if (assetTypeError || serialNumberError || descriptionError) {
        setValidationErrors({
          assetType: assetTypeError,
          serialNumber: serialNumberError,
          description: descriptionError
        });
        return;
      }
      
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
      // Show backend error message if available
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
              isInvalid={!!validationErrors.assetType}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.assetType}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Asset type must be lowercase with no spaces
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Serial Number</Form.Label>
            <Form.Control
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              required
              isInvalid={!!validationErrors.serialNumber}
              maxLength={12}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.serialNumber}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Serial number must be alphanumeric and 12 characters or less
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!validationErrors.description}
              maxLength={500}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.description}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Maximum 500 characters
            </Form.Text>
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