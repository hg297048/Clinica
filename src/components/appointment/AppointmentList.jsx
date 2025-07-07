
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, CheckCircle, X, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';


const AppointmentList = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = useCallback(async () => {
    if (!user) {
      setAppointments([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      // RLS ensures patients only see their own appointments based on email.
      // .eq('email', user.email) // This is handled by RLS, but explicit for clarity if RLS wasn't there.
      .order('date', { ascending: true })
      .order('time', { ascending: true });


    if (error) {
      console.error('Error fetching appointments:', error);
      toast({ title: "Error", description: "No se pudieron cargar tus citas.", variant: "destructive" });
      setAppointments([]);
    } else {
      setAppointments(data);
    }
    setLoading(false);
  }, [toast, user]);

  useEffect(() => {
    fetchAppointments();

    if (user) {
      const channel = supabase.channel(`realtime:public:appointments:user-${user.id}`)
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'appointments', filter: `email=eq.${user.email}` }, 
          (payload) => {
            fetchAppointments();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [fetchAppointments, user]);


  const cancelAppointment = async (id) => {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error canceling appointment:', error);
      toast({
        title: "Error al cancelar cita",
        description: "Hubo un problema al cancelar tu cita. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Cita cancelada",
        description: "La cita ha sido cancelada exitosamente.",
      });
    }
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return "";
    try {
      return format(parseISO(dateString), 'PPP', { locale: es });
    } catch (error) {
      return "Fecha inválida";
    }
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pendiente':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pendiente</Badge>;
      case 'confirmada':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Confirmada</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };


  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 section-title">Mis Citas Agendadas</h2>
        <div className="text-center py-10">
          <p className="text-gray-500">Cargando tus citas...</p>
        </div>
      </motion.div>
    );
  }
  
  if (!user) {
     return (
       <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 section-title">Mis Citas Agendadas</h2>
         <div className="text-center py-10 bg-gray-50 rounded-md">
            <AlertTriangle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Inicia Sesión</h3>
            <p className="text-gray-500">Para ver y gestionar tus citas, por favor <a href="/login" className="text-primary hover:underline font-semibold">inicia sesión</a> o <a href="/signup" className="text-primary hover:underline font-semibold">crea una cuenta</a>.</p>
        </div>
      </motion.div>
     );
  }


  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6 section-title">Mis Citas Agendadas</h2>
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
                  <h3 className="font-bold text-lg text-primary">{appointment.psychologist}</h3>
                  <div className="flex items-center mt-2 text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDateDisplay(appointment.date)}</span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          disabled={new Date(appointment.date) < new Date()} // Disable for past appointments
                        >
                          <X className="h-4 w-4 mr-1" /> Cancelar
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro de cancelar esta cita?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. La cita con {appointment.psychologist} el {formatDateDisplay(appointment.date)} a las {appointment.time} será cancelada.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No, mantener cita</AlertDialogCancel>
                        <AlertDialogAction onClick={() => cancelAppointment(appointment.id)} className="bg-destructive hover:bg-destructive/90">
                          Sí, cancelar cita
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600"><strong>Motivo:</strong> {appointment.reason}</p>
              </div>
              <div className="mt-3 flex items-center">
                 {getStatusBadge(appointment.status)}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No tienes citas programadas</h3>
          <p className="text-gray-500">Completa el formulario en esta página para agendar tu primera cita.</p>
        </div>
      )}
    </motion.div>
  );
};

export default AppointmentList;
