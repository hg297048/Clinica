
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, ShieldCheck, Users, Zap, Award, HeartHandshake as Handshake } from 'lucide-react';

const HomePage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const valuesData = [
    {
      icon: <Award className="h-10 w-10 text-primary value-icon" />,
      title: "Profesionalismo",
      description: "Nuestros psicólogos cuentan con los más altos estándares éticos y de responsabilidad social, en apego al código de ética profesional del psicólogo."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary value-icon" />,
      title: "Confidencialidad",
      description: "Garantizamos un trato digno, empático y confidencial a cada usuario, valorando la diversidad y promoviendo la inclusión."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary value-icon" />,
      title: "Calidad",
      description: "Buscamos la excelencia con un enfoque humano, cercano y personalizado, orientado a resultados y a la mejora continua de nuestro equipo."
    },
    {
      icon: <Brain className="h-10 w-10 text-primary value-icon" />,
      title: "Puntualidad",
      description: "Respetamos tu tiempo y nos comprometemos a cumplir con los horarios establecidos."
    },
    {
      icon: <Users className="h-10 w-10 text-primary value-icon" />,
      title: "Innovación",
      description: "Los psicólogos se preparan en constante formación y actualización profesional, incorporando prácticas y conocimientos de vanguardia en psicología."
    },
    {
      icon: <Handshake className="h-10 w-10 text-primary value-icon" />,
      title: "Compromiso social",
      description: "Buscamos contribuir activamente en el bienestar de la sociedad, promoviendo la salud mental como un derecho fundamental y participando en acciones de divulgación y prevención."
    }
  ];

  const servicesData = [
    {
      title: "Terapia Individual",
      description: "Atención personalizada online para abordar tus necesidades específicas y fomentar tu crecimiento personal."
    },
    {
      title: "Terapia de Pareja",
      description: "Espacio online para mejorar la comunicación, resolver conflictos y fortalecer los vínculos afectivos."
    },
    {
      title: "Terapia Familiar",
      description: "Intervención online para mejorar la dinámica familiar y encontrar soluciones conjuntas a los desafíos."
    },
    {
      title: "Terapia para Adolescentes",
      description: "Acompañamiento online especializado para jóvenes, abordando los retos propios de esta etapa vital."
    },
    {
      title: "Terapia Infantil",
      description: "Soporte online adaptado a los más pequeños, utilizando enfoques lúdicos y efectivos para su desarrollo."
    },
    {
      title: "Manejo de Emociones",
      description: "Herramientas y estrategias online para comprender y gestionar tus emociones de manera saludable."
    }
  ];


  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 hero-gradient opacity-90 z-0">
          <img  
            alt="Fondo de clínica psicológica abstracta" 
            className="w-full h-full object-cover mix-blend-overlay" src="https://images.unsplash.com/photo-1673104137579-43e3e7f20c80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Tu bienestar mental es nuestra prioridad
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Ofrecemos servicios psicológicos profesionales para ayudarte a superar obstáculos y mejorar tu calidad de vida, todo de forma online.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/citas">Agendar una Cita</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/nosotros">Conocer Más</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img  
                alt="logo de la cliníca" 
                className="w-full h-auto" src="psicologos\logo2.png" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-6 section-title">Sobre Nuestra Clínica</h2>
              <p className="text-gray-700 mb-6">
                En Clinica de Especialidades Psicologicas, nos dedicamos a proporcionar atención psicológica de alta calidad en un ambiente seguro y acogedor. Nuestro equipo de profesionales altamente calificados está comprometido con tu bienestar emocional y mental.
              </p>
              <p className="text-gray-700 mb-8">
                Ofrecemos una amplia gama de servicios psicológicos adaptados a las necesidades individuales de cada paciente, utilizando enfoques terapéuticos basados en evidencia científica. Todas nuestras terapias se ofrecen de forma online.
              </p>
              <Button asChild>
                <Link to="/nosotros" className="flex items-center">
                  Leer Más <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 inline-block section-title">Nuestros Valores</h2>
            <p className="text-gray-700">
              Estos principios fundamentales guían nuestra práctica y compromiso con cada paciente que atendemos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuesData.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md card-hover value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 inline-block section-title">Nuestros Servicios</h2>
            <p className="text-gray-700">
              Ofrecemos una amplia gama de servicios psicológicos online para atender diversas necesidades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md card-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <Link to="/citas" className="text-primary font-medium hover:underline flex items-center">
                  Agendar Cita <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
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
            <h2 className="text-3xl font-bold mb-6">¿Listo para comenzar tu camino hacia el bienestar?</h2>
            <p className="text-xl mb-8">
              Nuestro equipo de profesionales está preparado para acompañarte en este proceso, completamente online.
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

export default HomePage;
