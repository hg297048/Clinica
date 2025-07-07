
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Send } from 'lucide-react';

const ContactFormSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (value.trim() !== '') {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
    if (!formData.subject.trim()) newErrors.subject = 'El asunto es requerido';
    if (!formData.message.trim()) newErrors.message = 'El mensaje es requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);

    const { error } = await supabase
      .from('contact_messages') // Assuming you have a table named 'contact_messages'
      .insert([formData]);

    setIsSubmitting(false);

    if (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error al enviar mensaje",
        description: "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Mensaje enviado",
        description: "Hemos recibido tu mensaje. Te contactaremos pronto.",
        duration: 5000,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6 section-title">Envíanos un Mensaje</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <Form onSubmit={handleSubmit}>
          <FormItem className="mb-4">
            <FormLabel htmlFor="name">Nombre Completo</FormLabel>
            <FormControl>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'border-red-500' : ''} placeholder="Ingrese su nombre" />
            </FormControl>
            {errors.name && <FormMessage>{errors.name}</FormMessage>}
          </FormItem>
          <FormItem className="mb-4">
            <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
            <FormControl>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={errors.email ? 'border-red-500' : ''} placeholder="correo@ejemplo.com" />
            </FormControl>
            {errors.email && <FormMessage>{errors.email}</FormMessage>}
          </FormItem>
          <FormItem className="mb-4">
            <FormLabel htmlFor="subject">Asunto</FormLabel>
            <FormControl>
              <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} className={errors.subject ? 'border-red-500' : ''} placeholder="Asunto de su mensaje" />
            </FormControl>
            {errors.subject && <FormMessage>{errors.subject}</FormMessage>}
          </FormItem>
          <FormItem className="mb-6">
            <FormLabel htmlFor="message">Mensaje</FormLabel>
            <FormControl>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} className={errors.message ? 'border-red-500' : ''} placeholder="Escriba su mensaje aquí" rows={6} />
            </FormControl>
            {errors.message && <FormMessage>{errors.message}</FormMessage>}
          </FormItem>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : <><Send className="mr-2 h-4 w-4" /> Enviar Mensaje</>}
          </Button>
        </Form>
      </div>
    </motion.div>
  );
};

export default ContactFormSection;
