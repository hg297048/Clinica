
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const TeamPreviewSection = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const teamMembers = [
    {
      name: "Altamirano Ángeles Erick",
      title: "Psicólogo Clínico",
      imagePath: "/psicologos/1.png",
      description: "Especialidades: Ansiedad, Depresión, Orientación Vocacional, Proyecto de Vida, Orientación Psicológica."
    },
    {
      name: "Córdova Ruvalcaba Mario Antonio",
      title: "Psicoterapeuta",
      imagePath: "/psicologos/2.png",
      description: "Especialidades: Fobias, Ansiedad, Estrés, Depresión, Problemas de Relación."
    },
    {
      name: "Flores Ríos Yolotli Zacnite",
      title: "Psicoterapeuta",
      imagePath: "/psicologos/3.png",
      description: "Especialidades: Manejo de Emociones, Ansiedad, Estrés, Depresión, Habilidades Sociales."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl font-bold mb-6 inline-block section-title"
            {...fadeIn}
          >
            Nuestro Equipo
          </motion.h2>
          <motion.p 
            className="text-gray-700"
            {...fadeIn}
          >
            Contamos con profesionales altamente calificados y comprometidos con tu bienestar.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden psychologist-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  alt={`Psicólogo ${member.name}`} 
                  className="w-full h-full object-cover"
                  src={member.imagePath} 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.title}</p>
                <p className="text-gray-600 text-sm mb-4">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild>
            <Link to="/psicologos" className="flex items-center mx-auto">
              Ver Todo el Equipo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamPreviewSection;
