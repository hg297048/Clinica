
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppointmentFormWrapper from '@/components/appointment/AppointmentFormWrapper';
import AppointmentList from '@/components/appointment/AppointmentList';
import AppointmentInfo from '@/components/appointment/AppointmentInfo';
import { useAuth } from '@/contexts/AuthContext';
import { AlertTriangle } from 'lucide-react';

const AppointmentPageHeader = () => (
  <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1 
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Agenda tu Cita Online
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Completa el formulario para programar una consulta con nuestros profesionales. Todas las terapias son online.
        </motion.p>
      </div>
    </div>
  </section>
);

const AuthPrompt = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-6 rounded-lg shadow-md my-8 flex items-center"
  >
    <AlertTriangle className="h-8 w-8 mr-4 text-yellow-500 flex-shrink-0" />
    <div>
      <h2 className="text-xl font-semibold mb-2">Inicia Sesión para Agendar</h2>
      <p className="text-base">
        Por favor, <Link to="/login" className="font-bold underline hover:text-yellow-800">inicia sesión</Link> o <Link to="/signup" className="font-bold underline hover:text-yellow-800">crea una cuenta</Link> para poder agendar una cita.
      </p>
       <p className="text-sm mt-2">
        Si ya tienes citas agendadas, también podrás verlas y gestionarlas una vez que inicies sesión.
      </p>
    </div>
  </motion.div>
);

const PsychologistViewInfo = () => (
  <div className="text-center bg-blue-50 border border-blue-300 text-blue-700 p-6 rounded-lg shadow-md my-8">
    <h2 className="text-2xl font-semibold mb-3">Modo Psicólogo Activo</h2>
    <p className="text-lg">
      Como psicólogo, puedes ver y gestionar todas las citas desde tu <Link to="/dashboard-psicologo/citas" className="font-bold underline hover:text-blue-800">Panel de Control de Citas</Link>.
    </p>
    <p className="mt-2 text-md">
      La funcionalidad de agendar citas en esta página está orientada a los pacientes.
    </p>
  </div>
);


const AppointmentPage = () => {
  const { user, userProfile, loading } = useAuth();
  const isPsychologist = userProfile?.role === 'psychologist';

  if (loading) {
     return (
        <div className="pt-24 min-h-screen flex flex-col items-center justify-center">
            <AppointmentPageHeader />
            <p className="text-xl text-gray-600 my-10">Cargando información de usuario...</p>
            <AppointmentInfo />
        </div>
    );
  }

  return (
    <div className="pt-24">
      <AppointmentPageHeader />

      <section className="py-12">
        <div className="container mx-auto px-4">
          {isPsychologist ? (
            <PsychologistViewInfo />
          ) : !user ? (
            <AuthPrompt />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <AppointmentFormWrapper />
              <AppointmentList />
            </div>
          )}
        </div>
      </section>

      <AppointmentInfo />
    </div>
  );
};

export default AppointmentPage;
