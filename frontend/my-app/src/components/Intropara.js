import { FaInfoCircle } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import reactLogo from '../assets/Logo.svg';

export function Intropara() {
  return (
    <Container data-aos="fade-in">
      <Row className="align-items-center">
        <Col sm={4}>
          <img src={reactLogo} alt="IAOH Logo" className="d-flex justify-content-center" style={{ width: '80%', height: 'auto' }} />
        </Col>
        <Col sm={8}>
          <h1 className="text-center introparaheader">ASSET MANAGEMENT PORTAL</h1>
          <p className="para">
            The Asset Management Portal is a centralized platform designed to streamline the allocation, tracking, and management of IT and non-IT assets for employees being onboarded into the organization. It ensures transparency, accountability, and efficiency in asset distribution, providing real-time updates on inventory status and employee assignments. The portal supports departments like HR, IT, and administration to seamlessly coordinate and manage asset lifecycle operations from issuance to return or disposal.
          </p>
          <p className="para">
            Developed as an internal web-based tool, the system enables authorized personnel to generate reports, monitor usage, and ensure compliance with company asset policies. By automating asset assignment workflows and providing audit trails, the platform minimizes manual errors and enhances operational efficiency. It also helps in budgeting and forecasting future asset needs, contributing to effective resource planning and sustainable IT governance.
          </p>

        </Col>
      </Row>
    </Container>
  );
}
