import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import AssignmentTable from '../components/AssignmentTable';
import AssignmentForm from '../components/AssignmentForm';
import { getAllAssignments, createAssignment, updateAssignment, deleteAssignment } from '../api/assignmentApi';

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

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
    fetchAssignments();
  };

  const handleSubmit = async (formData) => {
    if (selectedAssignment) {
      await updateAssignment(selectedAssignment.assignmentId, formData);
    } else {
      await createAssignment(formData);
    }
    fetchAssignments();
  };

  return (
    <Container>
      <h2 className="my-4">Asset Assignments</h2>
      <Button variant="primary" onClick={handleAdd} className="mb-4">
        Add Assignment
      </Button>
      <AssignmentTable assignments={assignments} onEdit={handleEdit} onDelete={handleDelete} />
      <AssignmentForm open={openForm} onClose={() => setOpenForm(false)} onSubmit={handleSubmit} assignment={selectedAssignment} />
    </Container>
  );
}

export default Assignments;