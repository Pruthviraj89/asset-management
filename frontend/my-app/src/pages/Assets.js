import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Card } from 'react-bootstrap';
import { getAllAssets, createAsset, updateAsset, deleteAsset } from '../api/assetApi.js';
import AssetForm from '../components/AssetForm.js';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Footer from '../components/Footer.js';

function Assets() {
  const [assets, setAssets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const data = await getAllAssets();
      console.log('Fetched assets:', data);
      setAssets(data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedAsset) {
        await updateAsset(selectedAsset.assetId, formData);
      } else {
        const newAsset = await createAsset(formData);
        console.log('Created asset:', newAsset);
        setAssets([...assets, newAsset]);
      }
      await fetchAssets();
    } catch (error) {
      console.error('Error saving asset:', error);
      throw new Error(error.response?.data?.message || 'Failed to save asset');
    }
  };

  const handleEdit = (asset) => {
    setSelectedAsset(asset);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAsset(id);
      setAssets(assets.filter((asset) => asset.assetId !== id));
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  return (
    <>
    <Container fluid className="p-0">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Assets</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Add Asset
            </Button>
          </div>
          <Table striped bordered hover className="table-modern">
            <thead>
              <tr>
                <th>ID</th>
                <th>Asset Type</th>
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
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEdit(asset)}
                      className="me-2"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(asset.assetId)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <AssetForm
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedAsset(null);
        }}
        onSubmit={handleSubmit}
        asset={selectedAsset}
      />
    </Container>
    <Footer/>
    </>
  );
}

export default Assets;