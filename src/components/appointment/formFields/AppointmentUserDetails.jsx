
import React from 'react';
import { Input } from '@/components/ui/input';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { User, Mail, Phone } from 'lucide-react';

const AppointmentUserDetails = ({ formData, errors, handleChange, disabled }) => {
  return (
    <>
      <FormItem>
        <FormLabel htmlFor="name">Nombre Completo</FormLabel>
        <FormControl>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className={`pl-10 ${errors.name ? 'border-red-500' : ''}`} 
              placeholder="Ingrese su nombre" 
              disabled={disabled}
            />
          </div>
        </FormControl>
        {errors.name && <FormMessage>{errors.name}</FormMessage>}
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
        <FormControl>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              className={`pl-10 ${errors.email ? 'border-red-500' : ''}`} 
              placeholder="correo@ejemplo.com" 
              disabled={disabled}
            />
          </div>
        </FormControl>
        {errors.email && <FormMessage>{errors.email}</FormMessage>}
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="phone">Teléfono</FormLabel>
        <FormControl>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`} 
              placeholder="123-456-7890" 
              disabled={disabled}
            />
          </div>
        </FormControl>
        {errors.phone && <FormMessage>{errors.phone}</FormMessage>}
      </FormItem>
    </>
  );
};

export default AppointmentUserDetails;
