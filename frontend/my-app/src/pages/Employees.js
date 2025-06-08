import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/employeeApi';
import Footer from '../components/Footer';

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
    <>
    <Container>
      <h2 className="my-4">Employees Management</h2>
      
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
      <EmployeeForm open={openForm} onClose={() => setOpenForm(false)} onSubmit={handleSubmit} employee={selectedEmployee} />
    </Container>
    <Footer/>
    </>
    
  );
}

export default Employees;