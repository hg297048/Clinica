
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import PsychologistsPage from '@/pages/PsychologistsPage';
import AppointmentPage from '@/pages/AppointmentPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import PsychologistDashboardPage from '@/pages/PsychologistDashboardPage';
import ManageAppointmentsPage from '@/pages/ManageAppointmentsPage';
import ManageMessagesPage from '@/pages/ManageMessagesPage';
import PsychologistActivityPage from '@/pages/PsychologistActivityPage';
import { supabase } from '@/lib/supabaseClient';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Cargando...</p></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && userProfile?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/psicologos" element={<PsychologistsPage />} />
          <Route path="/citas" element={<AppointmentPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          <Route 
            path="/dashboard-psicologo" 
            element={
              <ProtectedRoute role="psychologist">
                <PsychologistDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard-psicologo/citas" 
            element={
              <ProtectedRoute role="psychologist">
                <ManageAppointmentsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard-psicologo/mensajes" 
            element={
              <ProtectedRoute role="psychologist">
                <ManageMessagesPage />
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/dashboard-psicologo/actividad" 
            element={
              <ProtectedRoute role="psychologist">
                <PsychologistActivityPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
