import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Assets from './pages/Assets';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Assignments from './pages/Assignments';
import UserDashboard from './pages/UserDashboard';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import UserNavbar from './components/UserNavbar';
import AdminNavbar from './components/Navbar';

function MainRoutes() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      {auth.isAuthenticated && auth.role === 'USER' ? <UserNavbar /> : auth.isAuthenticated ? <AdminNavbar /> : null}
      <Routes>
        <Route path="/" element={auth.isAuthenticated ? (auth.role === 'USER' ? <UserDashboard /> : <Dashboard />) : <Navigate to="/login" />} />
        <Route path="/assets" element={auth.isAuthenticated && auth.role === 'ADMIN' ? <Assets /> : <Navigate to="/" />} />
        <Route path="/employees" element={auth.isAuthenticated && auth.role === 'ADMIN' ? <Employees /> : <Navigate to="/" />} />
        <Route path="/assignments" element={auth.isAuthenticated && auth.role === 'ADMIN' ? <Assignments /> : <Navigate to="/" />} />
        <Route path="/login" element={!auth.isAuthenticated ? <UserLogin /> : <Navigate to="/" />} />
        <Route path="/register" element={!auth.isAuthenticated ? <UserRegister /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default MainRoutes;