import { useEffect, useRef } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/AboutUs.css';
import Footer from '../components/Footer.js';

const AboutUs = () => {
  const sections = useRef([]);
  const images = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          } else {
            entry.target.classList.remove('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    images.current.forEach((image) => {
      if (image) observer.observe(image);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
     <Container fluid>
      <Row
        ref={(el) => sections.current.push(el)}
        className="position-relative text-center fade-section header-section"
        style={{ height: '400px', overflow: 'hidden' }}
      >
        <Image
          src="/header-image.jpg"
          alt="Asset management portal image"
          fluid
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <h1 className="position-absolute top-50 start-50 translate-middle header-title" style={{ color: 'white' }}>
          About Asset Management Portal
        </h1>
      </Row>

      <Container className="mt-5 mb-5 pt-4 pb-4">
        <h2
          className="fade-section main-heading text-center"
          ref={(el) => sections.current.push(el)}
        >
          Asset Management Portal
        </h2>

        <p
          ref={(el) => sections.current.push(el)}
          className="fade-section main-paragraph"
        >
          The Asset Management Portal is designed to streamline asset tracking and employee-resource assignments within an organization. It enables centralized monitoring, optimized allocation, and real-time visibility of assets across departments.
        </p>
        <p
          ref={(el) => sections.current.push(el)}
          className="fade-section main-paragraph"
        >
          This platform supports compliance and accountability by maintaining detailed records of asset ownership and transfer history. Built for scalability and security, it aims to enhance operational efficiency and transparency in resource management.
        </p>
      </Container>

      <Container fluid className="bg-dark text-white py-5">
        <Container>
          <h3 className="fw-bold mb-4 fade-section" ref={(el) => sections.current.push(el)}>
            Aims and Objectives of the association are
          </h3>
          <ul className="objectives-list">
            <li ref={(el) => sections.current.push(el)} className="fade-section">
              To track and manage organizational assets effectively throughout their lifecycle.
            </li>
            <li ref={(el) => sections.current.push(el)} className="fade-section">
              To assign assets to employees and departments with complete accountability and traceability.
            </li>
            <li ref={(el) => sections.current.push(el)} className="fade-section">
              To centralize asset data for improved visibility, utilization, and reporting.
            </li>
            <li ref={(el) => sections.current.push(el)} className="fade-section">
              To ensure compliance with internal policies and external audits through accurate asset documentation.
            </li>
            <li ref={(el) => sections.current.push(el)} className="fade-section">
              To streamline asset procurement, allocation, and decommission processes using a unified digital platform.
            </li>
          </ul>
        </Container>
      </Container>

      <Container className="my-5">
        <Row>
          <Col md={6}>
            <Image
              src="/objectives.png"
              alt="Objectives Image"
              fluid
              ref={(el) => images.current.push(el)}
              className="fade-section zoom-image objectives-image"
            />
          </Col>
          <Col md={6}>
            <h4 className="text-primary fw-bold mb-3 fade-section" ref={(el) => sections.current.push(el)}>
              For achieving these objectives, the Association:
            </h4>
            <ul className="objectives-list">
              <li ref={(el) => sections.current.push(el)} className="fade-section">
                Conducts regular audits and reviews of asset records to ensure data accuracy and accountability.
              </li>
              <li ref={(el) => sections.current.push(el)} className="fade-section">
                Organizes training sessions and workshops to onboard employees and administrators on the asset management system.
              </li>
              <li ref={(el) => sections.current.push(el)} className="fade-section">
                Generates and distributes comprehensive reports on asset utilization, depreciation, and inventory health.
              </li>
              <li ref={(el) => sections.current.push(el)} className="fade-section">
                Continuously improves platform features based on feedback and evolving organizational needs.
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      {/* Meet the Team Section - moved to the bottom */}
      <Container className="my-5">
        <h2
          className="text-center fw-bold mb-4 fade-section"
          ref={(el) => sections.current.push(el)}
        >
          Meet The Team
        </h2>
        <Row className="g-4 text-center">
          {[
            { name: "Rohan Sharma", image: "/Rohan.jpg" },
            { name: "Pruthviraj Mane", image: "/Pruthvi.jpg" },
            { name: "Pooja Nalawade", image: "/Pooja.jpg" }
          ].map((dev, index) => (
            <Col md={4} key={index}>
              <Image
                src={dev.image}
                alt={dev.name}
                fluid
                ref={(el) => images.current.push(el)}
                className="fade-section zoom-image"
                style={{ height: '400px', objectFit: 'cover', borderRadius: '12px' }}
              />
              <h5 className="mt-3">{dev.name}</h5>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
    <Footer/>
    </>


   
  );
};

export default AboutUs;
