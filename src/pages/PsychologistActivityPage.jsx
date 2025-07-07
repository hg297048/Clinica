
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, MessageSquare, Calendar, User, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ActivityIcon = ({ type }) => {
  if (type.includes('appointment')) {
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  }
  if (type.includes('message')) {
    return <MessageSquare className="h-5 w-5 text-blue-500" />;
  }
  return <Info className="h-5 w-5 text-gray-500" />;
};

const ActivityDescription = ({ action }) => {
  switch (action.action_type) {
    case 'confirmed_appointment':
      return (
        <span>
          Confirmaste la cita para <strong>{action.details?.patient_name || 'Paciente Desconocido'}</strong> 
          {action.details?.appointment_date ? ` el ${format(parseISO(action.details.appointment_date), 'PPP', { locale: es })}` : ''}.
        </span>
      );
    case 'marked_appointment_pending':
        return (
          <span>
            Marcaste como pendiente la cita para <strong>{action.details?.patient_name || 'Paciente Desconocido'}</strong>
            {action.details?.appointment_date ? ` del ${format(parseISO(action.details.appointment_date), 'PPP', { locale: es })}` : ''}.
          </span>
        );
    case 'responded_message':
      return (
        <span>
          Respondiste al mensaje de <strong>{action.details?.patient_email || 'Email Desconocido'}</strong>
          {action.details?.message_subject ? ` sobre "${action.details.message_subject}"` : ''}.
        </span>
      );
    default:
      return <span>Realizaste una acción: {action.action_type}</span>;
  }
};

const PsychologistActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchActivities = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('psychologist_actions')
      .select('*')
      .eq('psychologist_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching activities:", error);
      toast({ title: "Error", description: "No se pudo cargar el historial de actividad.", variant: "destructive" });
    } else {
      setActivities(data);
    }
    setLoading(false);
  }, [user, toast]);

  useEffect(() => {
    fetchActivities();
     const channel = supabase.channel(`realtime:public:psychologist_actions:user-${user?.id}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'psychologist_actions', filter: `psychologist_id=eq.${user?.id}` }, 
        (payload) => {
          fetchActivities();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchActivities, user]);
  
  const formatDate = (dateStr) => format(parseISO(dateStr), "Pp", { locale: es });

  return (
    <div className="pt-28 pb-16 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi Actividad Reciente</h1>

        {loading ? (
          <p className="text-center text-gray-500">Cargando actividad...</p>
        ) : activities.length === 0 ? (
          <p className="text-center text-gray-500 py-10 bg-white rounded-lg shadow">No hay actividad registrada aún.</p>
        ) : (
          <div className="bg-white rounded-xl shadow-lg">
            <ul className="divide-y divide-gray-200">
              {activities.map((action) => (
                <motion.li
                  key={action.id}
                  className="p-4 hover:bg-gray-50 transition-colors duration-150"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 pt-1">
                      <ActivityIcon type={action.action_type} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700">
                        <ActivityDescription action={action} />
                      </p>
                      <p className="text-xs text-gray-400 flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" /> {formatDate(action.created_at)}
                      </p>
                    </div>
                     <Badge variant="outline" className="text-xs whitespace-nowrap">
                        {action.action_type === 'confirmed_appointment' && 'Cita Confirmada'}
                        {action.action_type === 'marked_appointment_pending' && 'Cita Pendiente'}
                        {action.action_type === 'responded_message' && 'Mensaje Respondido'}
                     </Badge>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PsychologistActivityPage;
