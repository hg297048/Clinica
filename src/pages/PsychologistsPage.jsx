
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PsychologistsPage = () => {
  const psychologists = [
    {
      id: 1,
      name: "Altamirano Ángeles Erick",
      title: "Psicólogo Clínico",
      imagePath: "/psicologos/1.png",
      specialties: ["Ansiedad", "Depresión", "Orientación Vocacional", "Proyecto de Vida", "Orientación Psicológica"],
      approach: "Terapia cognitivo-conductual (TCC), Terapia de Aceptación y Compromiso (ACT)",
      modality: "Online Español",
      description: "Erick te ayudará a desarrollar herramientas para manejar la ansiedad y depresión, y a definir tu proyecto de vida con claridad y propósito."
    },
    {
      id: 2,
      name: "Córdova Ruvalcaba Mario Antonio",
      title: "Psicoterapeuta",
      imagePath: "/psicologos/2.png",
      specialties: ["Fobias", "Ansiedad", "Estrés", "Depresión", "Problemas de Relación"],
      approach: "Terapia cognitivo-conductual (TCC)",
      modality: "Online Español e Inglés",
      description: "Mario Antonio se especializa en el tratamiento de fobias y problemas de relación, ofreciendo un espacio seguro y bilingüe para tu terapia."
    },
    {
      id: 3,
      name: "Flores Ríos Yolotli Zacnite",
      title: "Psicoterapeuta",
      imagePath: "/psicologos/3.png",
      specialties: ["Manejo de Emociones", "Ansiedad", "Estrés", "Depresión", "Habilidades Sociales", "Relaciones de Pareja", "Orientación Psicológica"],
      approach: "Sistémico, terapia breve",
      modality: "Online Español",
      description: "Yolotli te acompañará en el manejo de tus emociones y el fortalecimiento de tus habilidades sociales y de pareja, con un enfoque breve y efectivo."
    },
    {
      id: 4,
      name: "Ortega Marín María Eugenia",
      title: "Psicóloga laboral",
      imagePath: "/psicologos/4.png",
      specialties: ["Problemas de Ansiedad", "Burnout", "Estrés", "Orientación Psicológica"],
      approach: "Psicoterapia Breve",
      modality: "Online Español",
      description: "María Eugenia es experta en burnout y estrés laboral, ofreciendo psicoterapia breve para ayudarte a recuperar tu bienestar en el trabajo."
    },
    {
      id: 5,
      name: "Ruvalcaba Gaona Iliana",
      title: "Terapeuta Familiar y de Pareja",
      imagePath: "/psicologos/5.png",
      specialties: ["Violencia", "Comunicación", "Límites", "Resolución de Conflictos", "Desarrollo de Habilidades para la Vida", "Orientación Vocacional", "Orientación Psicológica"],
      approach: "Sistémico y Terapia Breve",
      modality: "Online Español",
      description: "Iliana se enfoca en mejorar la comunicación y resolver conflictos en el ámbito familiar y de pareja, promoviendo relaciones más sanas."
    }
  ];

  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Nuestro Equipo de Profesionales
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Conoce a los psicólogos que forman parte de Clinica de Especialidades Psicologicas, todos ellos altamente calificados y comprometidos con tu bienestar.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {psychologists.map((psychologist, index) => (
              <motion.div
                key={psychologist.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden psychologist-card flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={psychologist.imagePath}
                    alt={`${psychologist.name}, ${psychologist.title}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2">{psychologist.name}</h3>
                  <p className="text-primary font-medium mb-3">{psychologist.title}</p>
                  
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">Especialidades:</h4>
                    <div className="flex flex-wrap gap-1">
                      {psychologist.specialties.map((specialty, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">Enfoque:</h4>
                    <p className="text-gray-600 text-xs">{psychologist.approach}</p>
                  </div>

                   <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">Modalidad:</h4>
                    <p className="text-gray-600 text-xs">{psychologist.modality}</p>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm flex-grow">{psychologist.description}</p>
                                    
                  <div className="mt-auto">
                    <Button asChild className="w-full">
                      <Link to="/citas">Agendar Cita</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">¿Listo para dar el primer paso?</h2>
            <p className="text-xl mb-8">
              Nuestros profesionales están preparados para ayudarte en tu camino hacia el bienestar emocional.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/citas">Agendar una Cita Ahora</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PsychologistsPage;
