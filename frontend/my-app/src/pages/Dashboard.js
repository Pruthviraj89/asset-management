import React, { useContext } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { FaLaptop, FaUsers, FaTasks } from 'react-icons/fa';

function Dashboard() {
  const { auth } = useContext(AuthContext);

  return (
    <Container fluid className="py-4 px-3 px-md-4">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>
      <Card className="welcome-card shadow-lg mb-4">
        <Card.Body className="text-center">
          <i className="fas fa-user-cog fa-3x text-primary mb-3"></i>
          <Card.Title>Welcome, {auth.user?.firstName || 'Admin'}!</Card.Title>
          <Card.Text>
            Manage your organization’s assets, employees, and assignments efficiently with AssetFlow.
          </Card.Text>
        </Card.Body>
      </Card>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="dash-card shadow-sm">
            <Card.Body>
              <FaLaptop className="text-primary mb-3" size={30} />
              <Card.Title>Assets</Card.Title>
              <Card.Text>View and manage all assets in your inventory.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="dash-card shadow-sm">
            <Card.Body>
              <FaUsers className="text-primary mb-3" size={30} />
              <Card.Title>Employees</Card.Title>
              <Card.Text>Add, update, or remove employee records.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="dash-card shadow-sm">
            <Card.Body>
              <FaTasks className="text-primary mb-3" size={30} />
              <Card.Title>Assignments</Card.Title>
              <Card.Text>Track and assign assets to employees.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;