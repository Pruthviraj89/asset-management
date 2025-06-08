import React, { useState, useEffect, useContext } from 'react';
import { Card, Container, Row, Col, Spinner, Navbar, Nav } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getAllAssignments } from '../api/assetApi';
import { FaLaptop, FaCalendarAlt, FaStickyNote, FaChartBar, FaTasks, FaClock, FaGlobe, FaBox, FaUser, FaShieldAlt } from 'react-icons/fa';

function UserDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAllAssignments();
        const userAssignments = data.filter(
          (assignment) => assignment.employee.employeeId === auth.user?.employeeId
        );
        setAssignments(userAssignments);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };
    if (auth.user) {
      fetchAssignments();
    } else {
      setLoading(false);
    }
  }, [auth.user]);

  return (
    <Container fluid className="dashboard-container p-0">
      {/* Hero Section */}
      <div className="hero-section text-center text-white p-5">
        <h1 className="animate__animated animate__fadeIn">
          Welcome, {auth.user?.firstName || 'User'}!
        </h1>
        <p className="lead animate__animated animate__fadeIn animate__delay-1s">
          Manage your assigned assets with ease.
        </p>
      </div>

      {/* Stats Bar */}
      <Container fluid className="stats-bar py-4 px-0">
        <Row className="text-center g-0 px-3">
          <Col xs={4}>
            <Card className="stat-card shadow-sm">
              <Card.Body>
                <FaBox className="text-primary mb-2" size={30} />
                <h5>{assignments.length}</h5>
                <p>Assigned Assets</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4}>
            <Card className="stat-card shadow-sm">
              <Card.Body>
                <FaUser className="text-primary mb-2" size={30} />
                <h5>{auth.user?.department || 'N/A'}</h5>
                <p>Department</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4}>
            <Card className="stat-card shadow-sm">
              <Card.Body>
                <FaShieldAlt className="text-primary mb-2" size={30} />
                <h5>Active</h5>
                <p>Account Status</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid className="px-3 px-md-4 py-3">
        <Row className="g-0">
          {/* Sidebar */}
          <Col md={2} className="px-3 mb-4">
            <Card className="sidebar-card shadow-sm">
              <Card.Body>
                <h5 className="mb-4">
                  <FaChartBar className="me-2" /> Dashboard
                </h5>
                <Nav className="flex-column">
                  <Nav.Link className="sidebar-item">
                    <FaTasks className="me-2" /> Assets: {assignments.length}
                  </Nav.Link>
                  <Nav.Link className="sidebar-item">
                    <FaClock className="me-2" /> Recent Activity
                  </Nav.Link>
                  <Nav.Link className="sidebar-item">
                    <FaGlobe className="me-2" /> System Status
                  </Nav.Link>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content */}
          <Col md={10} className="px-3">
            <h2 className="mb-4 text-center">My Assigned Assets</h2>
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : assignments.length === 0 ? (
              <Card className="shadow-sm animate__animated animate__fadeIn">
                <Card.Body className="text-center">
                  <FaLaptop className="text-muted mb-3" size={50} />
                  <Card.Text>No assets assigned to you.</Card.Text>
                </Card.Body>
              </Card>
            ) : (
              <Row xs={1} md={2} lg={3} className="g-4">
                {assignments.map((assignment, index) => (
                  <Col key={assignment.assignmentId}>
                    <Card
                      className="asset-card shadow-sm h-100 animate__animated animate__fadeIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Card.Body>
                        <div className="d-flex align-items-center mb-3">
                          <FaLaptop className="text-primary me-2" size={24} />
                          <Card.Title className="mb-0">{assignment.asset.assetType}</Card.Title>
                        </div>
                        <Card.Text>
                          <strong>Serial Number:</strong> {assignment.asset.serialNumber}<br />
                          <strong>
                            <FaCalendarAlt className="me-1" /> Assigned Date:
                          </strong>{' '}
                          {assignment.assignedDate}<br />
                          {assignment.notes && (
                            <>
                              <strong>
                                <FaStickyNote className="me-1" /> Notes:
                              </strong>{' '}
                              {assignment.notes}
                            </>
                          )}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Navbar bg="dark" variant="dark" className="footer mt-5 py-4">
        <Container fluid className="px-3 px-md-4">
          <Nav className="me-auto px-3">
            <Nav.Link href="#" className="text-white mx-2">
              <i className="fas fa-info-circle me-1"></i> About
            </Nav.Link>
            <Nav.Link href="#" className="text-white mx-2">
              <i className="fas fa-envelope me-1"></i> Contact
            </Nav.Link>
          </Nav>
          <Nav className="px-3">
            <Nav.Link href="#" className="text-white mx-2">
              <i className="fab fa-github"></i>
            </Nav.Link>
            <Nav.Link href="#" className="text-white mx-2">
              <i className="fab fa-linkedin"></i>
            </Nav.Link>
            <Nav.Link href="#" className="text-white mx-2">
              <i className="fab fa-twitter"></i>
            </Nav.Link>
          </Nav>
          <div className="text-white text-center w-100 mt-2 px-3">
            © 2025 AssetFlow. All rights reserved.
          </div>
        </Container>
      </Navbar>
    </Container>
  );
}

export default UserDashboard;