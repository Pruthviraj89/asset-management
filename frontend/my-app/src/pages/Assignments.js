import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import AssignmentTable from '../components/AssignmentTable';
import AssignmentForm from '../components/AssignmentForm';
import {
  getAllAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from '../api/assignmentApi';
import Footer from '../components/Footer.js';

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [refreshCounter, setRefreshCounter] = useState(0); // Counter to trigger refresh

  // Fetch data whenever refreshCounter changes
  useEffect(() => {
    fetchAssignments();
  }, [refreshCounter]);

  const fetchAssignments = async () => {
    const data = await getAllAssignments();
    setAssignments(data);
  };

  const handleAdd = () => {
    setSelectedAssignment(null);
    setOpenForm(true);
  };

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    await deleteAssignment(id);
    setRefreshCounter((prev) => prev + 1); // Trigger refresh
  };

  const handleSubmit = async (formData) => {
    if (selectedAssignment) {
      await updateAssignment(selectedAssignment.assignmentId, formData);
    } else {
      await createAssignment(formData);
    }
    setRefreshCounter((prev) => prev + 1); // Trigger refresh
  };

  return (
    <>
     <Container>
      <h2 className="my-4">Asset Assignments</h2>
      <Button variant="primary" onClick={handleAdd} className="mb-4">
        Add Assignment
      </Button>
      <AssignmentTable
        assignments={assignments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AssignmentForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        assignment={selectedAssignment}
      />
    </Container>
    <Footer/>
    </>
   
  );
}

export default Assignments;
