
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { format, addDays, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { RotateCcw } from 'lucide-react';
import AppointmentPsychologistSelect from './formFields/AppointmentPsychologistSelect';
import AppointmentDateSelect from './formFields/AppointmentDateSelect';
import AppointmentTimeSelect from './formFields/AppointmentTimeSelect';
import AppointmentUserDetails from './formFields/AppointmentUserDetails';
import AppointmentReason from './formFields/AppointmentReason';

const psychologistsList = [
  { id: 1, name: "Altamirano Ángeles Erick", specialty: "Psicólogo Clínico" },
  { id: 2, name: "Córdova Ruvalcaba Mario Antonio", specialty: "Psicoterapeuta" },
  { id: 3, name: "Flores Ríos Yolotli Zacnite", specialty: "Psicoterapeuta" },
  { id: 4, name: "Ortega Marín María Eugenia", specialty: "Psicóloga laboral" },
  { id: 5, name: "Ruvalcaba Gaona Iliana", specialty: "Terapeuta Familiar y de Pareja" },
];

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  psychologist: '',
  date: '',
  time: '',
  reason: ''
};

const defaultTimes = [
  '09:00', '10:00', '11:00', '12:00',
  '15:00', '16:00', '17:00', '18:00'
];

const availableDates = Array.from({ length: 14 }, (_, i) => {
  const date = addDays(new Date(), i + 1);
  if (date.getDay() === 0 || date.getDay() === 6) { 
    return null;
  }
  return format(date, 'yyyy-MM-dd');
}).filter(Boolean);

const AppointmentForm = () => {
  const { toast } = useToast();
  const { user, userProfile } = useAuth();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const populateInitialFormWithUserData = useCallback(() => {
    if (user && userProfile) {
      setFormData(prev => ({
        ...initialFormData, // Start from clean slate but then apply user data
        name: userProfile.full_name || '',
        email: user.email || ''
      }));
    } else {
      setFormData(initialFormData); // Reset to completely empty if no user
    }
    setSelectedDate('');
    setErrors({});
  }, [user, userProfile]);

  useEffect(() => {
    populateInitialFormWithUserData();
  }, [populateInitialFormWithUserData]);

  const fetchBookedTimesForSelectedDate = useCallback(async () => {
    if (formData.psychologist && selectedDate) {
      const { data, error } = await supabase
        .from('appointments')
        .select('time')
        .eq('psychologist', formData.psychologist)
        .eq('date', selectedDate);

      if (error) {
        console.error('Error fetching booked appointments:', error);
        toast({ title: "Error", description: "No se pudieron cargar los horarios ocupados.", variant: "destructive" });
        setBookedTimes([]);
      } else {
        setBookedTimes(data.map(app => app.time));
      }
    } else {
      setBookedTimes([]);
    }
  }, [formData.psychologist, selectedDate, toast]);

  useEffect(() => {
    fetchBookedTimesForSelectedDate();
  }, [fetchBookedTimesForSelectedDate]);

  useEffect(() => {
    if (selectedDate && formData.psychologist) {
      setAvailableTimes(defaultTimes.filter(time => !bookedTimes.includes(time)));
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate, formData.psychologist, bookedTimes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (value.trim() !== '') {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value, ...(name === 'psychologist' || name === 'date' ? { time: '' } : {}) }));
    if (value && value.trim() !== '') {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (name === 'date') {
      setSelectedDate(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
    if (!formData.psychologist) newErrors.psychologist = 'Seleccione un psicólogo';
    if (!formData.date) newErrors.date = 'Seleccione una fecha';
    if (!formData.time) newErrors.time = 'Seleccione una hora';
    if (!formData.reason.trim()) newErrors.reason = 'La razón de la consulta es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClearForm = () => {
    populateInitialFormWithUserData(); // This will reset to initial or user-populated initial
    toast({ title: "Formulario Limpiado", description: "Se han borrado los datos del formulario." });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({ title: "Error al agendar cita", description: "Por favor complete todos los campos requeridos correctamente.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    
    const appointmentData = { 
      ...formData, 
      status: 'pendiente',
    };

    const { error } = await supabase
      .from('appointments')
      .insert([appointmentData]);

    setIsSubmitting(false);

    if (error) {
      console.error('Error inserting appointment:', error);
      toast({ title: "Error al agendar cita", description: "Hubo un problema al guardar tu cita. Inténtalo de nuevo.", variant: "destructive" });
    } else {
      toast({
        title: "Cita agendada con éxito",
        description: `Su cita ha sido programada para el ${format(parseISO(formData.date), 'PPP', { locale: es })} a las ${formData.time}.`,
        duration: 5000,
      });
      populateInitialFormWithUserData();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 section-title">Formulario de Cita</h2>
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <AppointmentUserDetails
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            disabled={!user} // Disable if user not logged in
          />
          
          <AppointmentPsychologistSelect
            value={formData.psychologist}
            onValueChange={(value) => handleSelectChange('psychologist', value)}
            psychologists={psychologistsList}
            error={errors.psychologist}
            disabled={!user}
          />
          
          <AppointmentDateSelect
            value={formData.date}
            onValueChange={(value) => handleSelectChange('date', value)}
            disabled={!formData.psychologist || !user}
            availableDates={availableDates}
            error={errors.date}
            psychologistSelected={!!formData.psychologist}
          />

          <AppointmentTimeSelect
            value={formData.time}
            onValueChange={(value) => handleSelectChange('time', value)}
            disabled={!formData.date || !formData.psychologist || !user}
            availableTimes={availableTimes}
            error={errors.time}
            psychologistAndDateSelected={!!formData.psychologist && !!formData.date}
          />
        </div>
        <AppointmentReason
          reason={formData.reason}
          error={errors.reason}
          handleChange={handleChange}
          disabled={!user}
        />
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button type="submit" className="flex-1" disabled={isSubmitting || !user}>
                {isSubmitting ? 'Agendando...' : 'Agendar Cita'}
            </Button>
            <Button type="button" variant="outline" onClick={handleClearForm} className="flex-1 sm:flex-none" disabled={!user}>
                <RotateCcw className="w-4 h-4 mr-2" /> Limpiar Formulario
            </Button>
        </div>
      </Form>
    </motion.div>
  );
};

export default AppointmentForm;
