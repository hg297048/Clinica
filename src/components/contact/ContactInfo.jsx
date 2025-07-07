
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 section-title">Información de Contacto</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Dirección</h3>
              <p className="text-gray-600">Av. Principal 123, Ciudad</p>
              <p className="text-gray-600">Código Postal 12345</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Teléfono</h3>
              <p className="text-gray-600">+123 456 7890</p>
              <p className="text-gray-600">+123 456 7891</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Email</h3>
              <p className="text-gray-600">info@clinicabienestar.com</p>
              <p className="text-gray-600">citas@clinicabienestar.com</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Horario de Atención</h3>
              <p className="text-gray-600">Lunes a Viernes: 9:00 - 19:00</p>
              <p className="text-gray-600">Sábado: 9:00 - 14:00</p>
              <p className="text-gray-600">Domingo: Cerrado</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Ubicación</h3>
          <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
            <img  alt="Mapa de ubicación de la clínica" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1682668628117-114ec3e2ffc6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
