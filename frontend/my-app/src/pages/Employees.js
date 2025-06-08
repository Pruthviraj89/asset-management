import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/employeeApi';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const data = await getAllEmployees();
    setEmployees(data);
  };

  const handleAdd = () => {
    setSelectedEmployee(null);
    setOpenForm(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  const handleSubmit = async (formData) => {
    if (selectedEmployee) {
      await updateEmployee(selectedEmployee.employeeId, formData);
    } else {
      await createEmployee(formData);
    }
    fetchEmployees();
  };

  return (
    <Container fluid className="px-3 px-md-4">
      <h2 className="my-4">Employees Management</h2>
      <Button variant="primary" onClick={handleAdd} className="mb-4">
        Add Employee
      </Button>
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
      <EmployeeForm open={openForm} onClose={() => setOpenForm(false)} onSubmit={handleSubmit} employee={selectedEmployee} />
    </Container>
  );
}

export default Employees;