
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { CheckSquare, XSquare, Calendar, Clock, User, Mail, Phone, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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


const ManageAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'confirmed'
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('appointments').select('*').order('date', { ascending: true }).order('time', { ascending: true });
    
    if (filter === 'pending') {
      query = query.eq('status', 'pendiente');
    } else if (filter === 'confirmed') {
      query = query.eq('status', 'confirmada');
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching appointments:", error);
      toast({ title: "Error", description: "No se pudieron cargar las citas.", variant: "destructive" });
    } else {
      setAppointments(data);
    }
    setLoading(false);
  }, [filter, toast]);

  useEffect(() => {
    fetchAppointments();
     const channel = supabase.channel('realtime:public:appointments:manage')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, (payload) => {
        fetchAppointments();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAppointments]);

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    if (!user) return;

    const { error } = await supabase
      .from('appointments')
      .update({ status: newStatus, confirmed_by: user.id })
      .eq('id', appointmentId);

    if (error) {
      console.error("Error updating appointment status:", error);
      toast({ title: "Error", description: "No se pudo actualizar el estado de la cita.", variant: "destructive" });
    } else {
      toast({ title: "Cita Actualizada", description: `La cita ha sido ${newStatus === 'confirmada' ? 'confirmada' : 'marcada como pendiente'}.` });
      // Record action
      await supabase.from('psychologist_actions').insert({
        psychologist_id: user.id,
        action_type: newStatus === 'confirmada' ? 'confirmed_appointment' : 'marked_appointment_pending',
        target_id: appointmentId,
        details: { appointment_date: appointments.find(a => a.id === appointmentId)?.date, patient_name: appointments.find(a => a.id === appointmentId)?.name }
      });
      fetchAppointments(); // Re-fetch to reflect changes immediately
    }
  };

  const formatDate = (dateStr) => format(parseISO(dateStr), "PPP", { locale: es });

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

  return (
    <div className="pt-28 pb-16 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Gestionar Citas</h1>
          <div className="flex space-x-2">
            <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>Todas</Button>
            <Button variant={filter === 'pending' ? 'default' : 'outline'} onClick={() => setFilter('pending')}>Pendientes</Button>
            <Button variant={filter === 'confirmed' ? 'default' : 'outline'} onClick={() => setFilter('confirmed')}>Confirmadas</Button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Cargando citas...</p>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-500 py-10 bg-white rounded-lg shadow">No hay citas que coincidan con el filtro seleccionado.</p>
        ) : (
          <div className="space-y-6">
            {appointments.map((apt) => (
              <motion.div
                key={apt.id}
                className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-primary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <div className="md:col-span-2 space-y-2">
                    <div className="flex items-center justify-between">
                       <h2 className="text-xl font-semibold text-primary">{apt.name}</h2>
                       {getStatusBadge(apt.status)}
                    </div>
                   
                    <p className="text-sm text-gray-600 flex items-center"><Mail className="w-4 h-4 mr-2 text-gray-400" /> {apt.email}</p>
                    <p className="text-sm text-gray-600 flex items-center"><Phone className="w-4 h-4 mr-2 text-gray-400" /> {apt.phone}</p>
                    <p className="text-sm text-gray-600 flex items-center"><User className="w-4 h-4 mr-2 text-gray-400" /> Psicólogo: {apt.psychologist}</p>
                    <p className="text-sm text-gray-600 flex items-center"><Calendar className="w-4 h-4 mr-2 text-gray-400" /> Fecha: {formatDate(apt.date)}</p>
                    <p className="text-sm text-gray-600 flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-400" /> Hora: {apt.time}</p>
                    <p className="text-sm text-gray-700 mt-2 pt-2 border-t border-gray-200 flex items-start">
                      <FileText className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" /> 
                      <span className="font-medium">Motivo:</span>&nbsp;{apt.reason}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 md:items-end md:justify-start pt-2 md:pt-0">
                    {apt.status === 'pendiente' && (
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button size="sm" className="w-full md:w-auto bg-green-500 hover:bg-green-600">
                            <CheckSquare className="w-4 h-4 mr-2" /> Confirmar
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Confirmar esta cita?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esto marcará la cita como confirmada. El paciente podría ser notificado (funcionalidad futura).
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => updateAppointmentStatus(apt.id, 'confirmada')} className="bg-green-500 hover:bg-green-600">
                              Confirmar Cita
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                    {apt.status === 'confirmada' && (
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full md:w-auto text-yellow-600 border-yellow-400 hover:bg-yellow-50">
                              <XSquare className="w-4 h-4 mr-2" /> Marcar Pendiente
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Marcar como pendiente?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esto cambiará el estado de la cita a pendiente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => updateAppointmentStatus(apt.id, 'pendiente')} className="bg-yellow-500 hover:bg-yellow-600">
                              Marcar Pendiente
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                    {/* Add option to cancel/delete appointment if needed by psychologist, considering policy */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageAppointmentsPage;
