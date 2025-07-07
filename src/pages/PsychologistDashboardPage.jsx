
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheck, MessageSquare, BarChart2, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const StatCard = ({ title, value, icon, color, linkTo }) => (
  <Link to={linkTo}>
    <motion.div 
      className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 ${color}`}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  </Link>
);


const PsychologistDashboardPage = () => {
  const { userProfile } = useAuth();
  // TODO: Fetch actual stats for appointments and messages
  const stats = {
    pendingAppointments: 5, 
    newMessages: 3,
  };

  return (
    <div className="pt-28 pb-16 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Bienvenido/a, {userProfile?.full_name || 'Psicólogo/a'}</h1>
          <p className="text-gray-600">Este es tu panel de control para gestionar la clínica.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Citas Pendientes" 
            value={stats.pendingAppointments} 
            icon={<CalendarCheck className="h-6 w-6 text-blue-500" />}
            color="border-blue-500"
            linkTo="/dashboard-psicologo/citas"
          />
          <StatCard 
            title="Mensajes Nuevos" 
            value={stats.newMessages} 
            icon={<MessageSquare className="h-6 w-6 text-green-500" />}
            color="border-green-500"
            linkTo="/dashboard-psicologo/mensajes"
          />
          <StatCard 
            title="Mi Actividad" 
            value="Ver Historial" 
            icon={<BarChart2 className="h-6 w-6 text-purple-500" />}
            color="border-purple-500"
            linkTo="/dashboard-psicologo/actividad"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Accesos Rápidos</h2>
            <div className="space-y-3">
              <Link to="/dashboard-psicologo/citas" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <CalendarCheck className="h-5 w-5 mr-3 text-blue-600" />
                <span>Gestionar Todas las Citas</span>
              </Link>
              <Link to="/dashboard-psicologo/mensajes" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <MessageSquare className="h-5 w-5 mr-3 text-green-600" />
                <span>Ver y Responder Mensajes</span>
              </Link>
               <Link to="/psicologos" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="h-5 w-5 mr-3 text-indigo-600" />
                <span>Ver Perfiles de Psicólogos (Público)</span>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Próximas Citas (Ejemplo)</h2>
            {/* Replace with actual upcoming appointments data */}
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg">
                <p className="font-medium">Paciente: Ana Pérez</p>
                <p className="text-sm text-gray-500">Fecha: 2025-05-20, 10:00 AM</p>
                <p className="text-sm text-blue-500">Estado: Pendiente de Confirmación</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <p className="font-medium">Paciente: Carlos López</p>
                <p className="text-sm text-gray-500">Fecha: 2025-05-20, 11:00 AM</p>
                 <p className="text-sm text-green-500">Estado: Confirmada</p>
              </div>
            </div>
            <Link to="/dashboard-psicologo/citas" className="mt-4 inline-block text-sm text-primary hover:underline">
              Ver todas las citas &rarr;
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PsychologistDashboardPage;
