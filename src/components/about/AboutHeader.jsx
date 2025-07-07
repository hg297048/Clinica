
import React from 'react';
import { motion } from 'framer-motion';

const AboutHeader = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sobre Nosotros
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Conoce nuestra historia, misión, visión y los valores que guían nuestro trabajo diario en Clinica de Especialidades Psicologicas.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutHeader;
