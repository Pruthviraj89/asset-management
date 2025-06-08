import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getAllAssets = async () => {
  const response = await axios.get(`${API_URL}/assets`);
  return response.data;
};

export const getAssetById = async (id) => {
  const response = await axios.get(`${API_URL}/assets/${id}`);
  return response.data;
};

export const createAsset = async (asset) => {
  const response = await axios.post(`${API_URL}/assets`, asset);
  return response.data;
};

export const updateAsset = async (id, asset) => {
  const response = await axios.put(`${API_URL}/assets/${id}`, asset);
  return response.data;
};

export const deleteAsset = async (id) => {
  await axios.delete(`${API_URL}/assets/${id}`);
};

export const getAllAssignments = async () => {
  const response = await axios.get(`${API_URL}/assignments`);
  return response.data;
};

export const createAssignment = async (assignment) => {
  const response = await axios.post(`${API_URL}/assignments`, assignment);
  return response.data;
};

export const getAllEmployees = async () => {
  const response = await axios.get(`${API_URL}/employees`);
  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await axios.post(`${API_URL}/employees`, employee);
  return response.data;
};

export const userLogin = async (credentials) => {
  const response = await axios.post(`${API_URL}/employees/user/login`, credentials);
  return response.data;
};

export const getAvailableAssets=async()=>{
	const response= await axios.get(`${API_URL}/assets/isAvailable`);
	return response.data;
}