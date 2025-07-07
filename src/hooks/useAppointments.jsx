
import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { formatDateToPPP, defaultAvailableTimes } from '@/utils/dateUtils';

const useAppointments = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    psychologist: '',
    date: '',
    time: '',
    reason: ''
  });
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      try {
        setAppointments(JSON.parse(savedAppointments));
      } catch (error) {
        console.error("Error parsing appointments from localStorage:", error);
        localStorage.removeItem('appointments'); 
      }
    }
  }, []);

  useEffect(() => {
    if (selectedDate && formData.psychologist) {
      const bookedTimes = appointments
        .filter(app => app.date === selectedDate && app.psychologist === formData.psychologist)
        .map(app => app.time);
      
      setAvailableTimes(defaultAvailableTimes.filter(time => !bookedTimes.includes(time)));
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate, formData.psychologist, appointments]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (value.trim() !== '') {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, []);

  const handleSelectChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (value && value.trim && value.trim() !== '') {
        setErrors(prev => ({ ...prev, [name]: '' }));
    } else if (value && typeof value !== 'string') {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'date') {
      setSelectedDate(value);
      setFormData(prev => ({ ...prev, time: '' })); 
    }
  }, []);

  const validateForm = useCallback(() => {
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
  }, [formData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (validateForm()) {
      const newAppointment = { id: Date.now(), ...formData, status: 'pendiente' };
      const updatedAppointments = [...appointments, newAppointment];
      setAppointments(updatedAppointments);
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      
      toast({
        title: "Cita agendada con éxito",
        description: `Su cita ha sido programada para el ${formatDateToPPP(formData.date)} a las ${formData.time}.`,
        duration: 5000,
      });
      
      setFormData({ name: '', email: '', phone: '', psychologist: '', date: '', time: '', reason: '' });
      setSelectedDate('');
      setErrors({});
    } else {
      toast({
        title: "Error al agendar cita",
        description: "Por favor complete todos los campos requeridos correctamente.",
        variant: "destructive",
      });
    }
  }, [validateForm, formData, appointments, toast]);

  const cancelAppointment = useCallback((id) => {
    const updatedAppointments = appointments.filter(app => app.id !== id);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    toast({
      title: "Cita cancelada",
      description: "La cita ha sido cancelada exitosamente.",
    });
  }, [appointments, toast]);

  return {
    appointments,
    formData,
    errors,
    availableTimes,
    selectedDate,
    handleChange,
    handleSelectChange,
    handleSubmit,
    cancelAppointment,
  };
};

export default useAppointments;
