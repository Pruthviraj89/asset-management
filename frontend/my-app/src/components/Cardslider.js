import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card } from 'react-bootstrap';
import pic1 from '../assets/1.png';
import pic2 from '../assets/2.png';
import pic3 from '../assets/3.png';
import './styles/CardSlider.css';

const cardData = [
  { title: 'Asset Procurement Guidebook', text: 'Quick asset procurement focus.', image: pic1, pdf: '/pdf1.pdf' },
  { title: 'Asset Related Queries', text: 'Focused solution to queries.', image: pic2, pdf: '/pdf2.pdf' },
  { title: 'Asset Health Manual', text: 'Primary care provider guidance.', image: pic3, pdf: '/pdf3.pdf' },
  { title: 'Employee Onboarding', text: 'Seamless onboarding guidance.', image: pic1, pdf: '/pdf4.pdf' },
  { title: 'Workplace Ergonomics', text: 'Improving workplace comfort, safety.', image: pic2, pdf: '/pdf1.pdf' },
  { title: 'Occupational Mental Wellness', text: 'Supporting employee mental health.', image: pic3, pdf: '/pdf2.pdf' },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 992 },
    items: 4,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 992, min: 768 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1
  }
};

export function CardSlider() {
  return (
    <div className="card-slider-container mt-5 mb-5" data-aos="fade-in">
      <Carousel responsive={responsive} infinite autoPlay={false} arrows>
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={() => window.open(card.pdf, '_blank')}
            style={{ cursor: 'pointer' }}
          >
            <Card className="custom-card">
              <Card.Img variant="top" src={card.image} className="custom-card-img" />
              <Card.Body>
                <Card.Title className='custom-card-text'>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
