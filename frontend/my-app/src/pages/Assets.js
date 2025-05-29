import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import AssetTable from '../components/AssetTable';
import AssetForm from '../components/AssetForm';
import { getAllAssets, createAsset, updateAsset, deleteAsset } from '../api/assetApi';

function Assets() {
  const [assets, setAssets] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    const data = await getAllAssets();
    setAssets(data);
  };

  const handleAdd = () => {
    setSelectedAsset(null);
    setOpenForm(true);
  };

  const handleEdit = (asset) => {
    setSelectedAsset(asset);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    await deleteAsset(id); // Errors are caught in AssetTable.js
    fetchAssets();
  };

  const handleSubmit = async (formData) => {
    if (selectedAsset) {
      await updateAsset(selectedAsset.assetId, formData);
    } else {
      await createAsset(formData);
    }
    fetchAssets();
  };

  return (
    <Container>
      <h2 className="my-4">Assets Management</h2>
      <Button variant="primary" onClick={handleAdd} className="mb-4">
        Add Asset
      </Button>
      <AssetTable assets={assets} onEdit={handleEdit} onDelete={handleDelete} />
      <AssetForm open={openForm} onClose={() => setOpenForm(false)} onSubmit={handleSubmit} asset={selectedAsset} />
    </Container>
  );
}

export default Assets;