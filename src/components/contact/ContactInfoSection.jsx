
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfoSection = () => {
  const contactDetails = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Dirección",
      lines: ["Enrique Rébsamen 611-10, Narvarte Poniente, Benito Juárez,", "03100 Ciudad de México."]
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Teléfono",
      lines: ["+52 55 2083 3145"]
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      lines: ["clinicadeespecialidadespsi@gmail.com"]
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Horario de Atención",
      lines: ["Lunes a Viernes: 9:00 - 18:00", "Sábado y Domingo: 9:00 - 18:00"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6 section-title">Información de Contacto</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="space-y-6">
          {contactDetails.map((detail, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                {detail.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{detail.title}</h3>
                {detail.lines.map((line, i) => (
                  <p key={i} className="text-gray-600">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Ubicación</h3>
          <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
            <img  class="w-full h-full object-cover" alt="Mapa de ubicación de la clínica" src="https://images.unsplash.com/photo-1561653978-a526ddcfda79" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfoSection;
