import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import MainRoutes from './MainRoutes';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Container className="mt-4">
            <MainRoutes />
          </Container>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;