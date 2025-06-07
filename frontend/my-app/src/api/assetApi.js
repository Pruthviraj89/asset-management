import axios from 'axios';

const API_URL = 'http://localhost:8080/api/assets';

export const getAllAssets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getByAvailable = async () => {
  const response = await axios.get('http://localhost:8080/api/assets/isAvailable');
  return response.data;
};


export const getAssetById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createAsset = async (asset) => {
  const response = await axios.post(API_URL, asset);
  return response.data;
};

export const updateAsset = async (id, asset) => {
  const response = await axios.put(`${API_URL}/${id}`, asset);
  return response.data;
};

export const deleteAsset = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};