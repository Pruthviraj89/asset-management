import axios from 'axios';

const API_URL = 'http://localhost:8080/api/assignments';

export const getAllAssignments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getAssignmentById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createAssignment = async (assignment) => {
  const response = await axios.post(API_URL, assignment);
  return response.data;
};

export const updateAssignment = async (id, assignment) => {
  const response = await axios.put(`${API_URL}/${id}`, assignment);
  return response.data;
};

export const deleteAssignment = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};