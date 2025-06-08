import AboutUs from './pages/About_Us';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ThemeProvider } from './context/ThemeContext';
import Assets from './pages/Assets';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Assignments from './pages/Assignments';
import Login from './pages/Login';
import Navigationbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navigationbar />
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aboutUs" element={<AboutUs />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;