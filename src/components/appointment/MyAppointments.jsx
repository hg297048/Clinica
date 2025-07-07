
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CheckCircle, X } from 'lucide-react';
import { formatDateToPPP } from '@/utils/dateUtils';

const MyAppointments = ({ appointments, cancelAppointment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6 section-title">Mis Citas</h2>
      
      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              className="bg-white p-6 rounded-lg shadow-md appointment-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{appointment.psychologist}</h3>
                  <div className="flex items-center mt-2 text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDateToPPP(appointment.date)}</span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={() => cancelAppointment(appointment.id)}
                >
                  <X className="h-4 w-4 mr-1" /> Cancelar
                </Button>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  <strong>Motivo:</strong> {appointment.reason}
                </p>
              </div>
              <div className="mt-3 flex items-center">
                <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                  appointment.status === 'pendiente' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {appointment.status === 'pendiente' ? 'Pendiente' : 'Confirmada'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No tienes citas programadas</h3>
          <p className="text-gray-500">
            Completa el formulario para agendar tu primera cita con nuestros profesionales.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default MyAppointments;
