
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { MessageSquare } from 'lucide-react';

const AppointmentReason = ({ reason, error, handleChange, disabled }) => {
  return (
    <FormItem className="mb-6">
      <FormLabel htmlFor="reason">Motivo de la Consulta</FormLabel>
      <FormControl>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
          <Textarea 
            id="reason" 
            name="reason" 
            value={reason} 
            onChange={handleChange} 
            className={`pl-10 ${error ? 'border-red-500' : ''}`} 
            placeholder="Describa brevemente el motivo de su consulta" 
            rows={4} 
            disabled={disabled}
          />
        </div>
      </FormControl>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};

export default AppointmentReason;
