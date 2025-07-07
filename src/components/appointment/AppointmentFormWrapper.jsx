
import React from 'react';
import AppointmentForm from './AppointmentForm';
import { useAuth } from '@/contexts/AuthContext';

const AppointmentFormWrapper = () => {
  const { user } = useAuth();

  // Aunque la página de citas ya tiene una lógica similar, 
  // este wrapper asegura que el formulario en sí no se renderice si no hay usuario.
  // La lógica principal de "debes iniciar sesión" está en AppointmentPage.jsx
  if (!user) {
    // No renderizar nada aquí directamente, AppointmentPage maneja el prompt.
    // Opcionalmente, podrías poner un placeholder si el diseño lo requiere,
    // pero es mejor centralizar el mensaje en AppointmentPage.
    return null; 
  }

  return <AppointmentForm />;
};

export default AppointmentFormWrapper;
