
import React from 'react';
import { motion } from 'framer-motion';

const HistorySection = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            {...fadeIn}
          >
            <h2 className="text-3xl font-bold mb-6 section-title">Nuestra Historia</h2>
            <p className="text-gray-700 mb-4">
              Clínica de Especialidades Psicológicas fue fundada por un grupo de psicólogos egresados de la UNAM comprometidos con brindar atención de calidad.
            </p>
            <p className="text-gray-700 mb-4">
              A lo largo de estos años, hemos ayudado a miles de personas a superar sus dificultades emocionales y psicológicas, adaptándonos constantemente a las nuevas investigaciones y metodologías en el campo de la psicología.
            </p>
            <p className="text-gray-700">
              Nuestro compromiso con la excelencia y el bienestar de nuestros pacientes nos ha permitido crecer y expandir nuestros servicios, manteniendo siempre la calidad y calidez que nos caracteriza.
            </p>
          </motion.div>
          <motion.div 
            className="rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img  
              alt="Imagen representativa de la historia de la clínica, tal vez un collage de hitos o un espacio de terapia acogedor." 
              className="w-full h-auto" src="https://images.unsplash.com/photo-1683226170046-a6794c48eefb" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
