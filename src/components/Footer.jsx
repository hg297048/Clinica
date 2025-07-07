
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Clinica de Especialidades Psicologicas</h3>
            <p className="text-gray-300 mb-4">
              Ofrecemos servicios psicológicos de alta calidad para ayudarte a alcanzar tu bienestar emocional y mental.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61567670631306" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Inicio</Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-gray-300 hover:text-white transition-colors">Nosotros</Link>
              </li>
              <li>
                <Link to="/psicologos" className="text-gray-300 hover:text-white transition-colors">Psicólogos</Link>
              </li>
              <li>
                <Link to="/citas" className="text-gray-300 hover:text-white transition-colors">Agendar Cita</Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-white transition-colors">Contacto</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Terapia Individual</li>
              <li className="text-gray-300">Terapia de Pareja</li>
              <li className="text-gray-300">Terapia Familiar</li>
              <li className="text-gray-300">Terapia para Adolescentes</li>
              <li className="text-gray-300">Evaluación Psicológica</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                <span className="text-gray-300">Enrique Rébsamen 611-10, Narvarte Poniente, Benito Juárez, 03100 Ciudad de México.</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary" />
                <span className="text-gray-300">+52 55 2083 3145</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary" />
                <span className="text-gray-300">clinicadeespecialidadespsi@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                <span className="text-gray-300">Lun - Vie: 9:00 - 18:00<br />Sáb y Dom: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Clinica de Especialidades Psicologicas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
