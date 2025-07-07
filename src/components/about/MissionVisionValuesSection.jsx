
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Zap, Brain, Users, HeartHandshake as Handshake } from 'lucide-react';

const MissionVisionValuesSection = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const valuesData = [
    {
      icon: <Award className="h-8 w-8 text-primary value-icon" />,
      title: "Profesionalismo",
      description: "Nuestros psicólogos cuentan con los más altos estándares éticos y de responsabilidad social, en apego al código de ética profesional del psicólogo."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary value-icon" />,
      title: "Confidencialidad",
      description: "Garantizamos un trato digno, empático y confidencial a cada usuario, valorando la diversidad y promoviendo la inclusión."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary value-icon" />,
      title: "Calidad",
      description: "Buscamos la excelencia con un enfoque humano, cercano y personalizado, orientado a resultados y a la mejora continua de nuestro equipo."
    },
    {
      icon: <Brain className="h-8 w-8 text-primary value-icon" />,
      title: "Puntualidad",
      description: "Respetamos tu tiempo y nos comprometemos a cumplir con los horarios establecidos."
    },
    {
      icon: <Users className="h-8 w-8 text-primary value-icon" />,
      title: "Innovación",
      description: "Los psicólogos se preparan en constante formación y actualización profesional, incorporando prácticas y conocimientos de vanguardia en psicología."
    },
    {
      icon: <Handshake className="h-8 w-8 text-primary value-icon" />,
      title: "Compromiso social",
      description: "Buscamos contribuir activamente en el bienestar de la sociedad, promoviendo la salud mental como un derecho fundamental y participando en acciones de divulgación y prevención."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl font-bold mb-6 inline-block section-title"
            {...fadeIn}
          >
            Misión, Visión y Valores
          </motion.h2>
          <motion.p 
            className="text-gray-700"
            {...fadeIn}
          >
            Estos son los pilares que sostienen nuestra práctica profesional y guían cada una de nuestras acciones.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-md h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-primary">Misión</h3>
            <p className="text-gray-700 text-sm">
              Brindar atención psicológica integral y de alta calidad a niños, adolescentes, adultos, adultos mayores, empresas y universidades, promoviendo el bienestar emocional y la salud mental a lo largo de todo el ciclo vital y en distintos contextos sociales.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-lg shadow-md h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-primary">Visión</h3>
            <p className="text-gray-700 text-sm">
              Ser un centro de referencia en atención psicológica en México, reconocido por la excelencia, profesionalismo y compromiso social de nuestros terapeutas. Aspiramos a liderar la innovación en servicios de salud mental, expandiendo nuestro alcance para impactar positivamente a más personas, familias, organizaciones y comunidades; contribuyendo a la desestigmatización y valoración de la psicología como recurso fundamental para el bienestar integral.
            </p>
          </motion.div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-10 text-center text-primary">Nuestros Valores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuesData.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md h-full value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-3">
                  {value.icon}
                  <h4 className="text-xl font-semibold ml-3">{value.title}</h4>
                </div>
                <p className="text-gray-700 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionValuesSection;
