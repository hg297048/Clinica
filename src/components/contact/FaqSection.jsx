
import React from 'react';
import { motion } from 'framer-motion';

const FaqSection = () => {
  const faqs = [
    {
      question: "¿Cómo puedo agendar una cita?",
      answer: "Puede agendar una cita a través de nuestro sitio web en la sección 'Agendar Cita', llamando a nuestro número telefónico o enviando un correo electrónico a citas@clinicadeespecialidadespsicologicas.com."
    },
    {
      question: "¿Cuál es la duración de las sesiones?",
      answer: "Las sesiones tienen una duración estándar de 50 minutos, aunque en casos específicos pueden extenderse según la recomendación del profesional."
    },
    {
      question: "¿Qué debo hacer si necesito cancelar mi cita?",
      answer: "Si necesita cancelar su cita, le pedimos que lo haga con al menos 24 horas de anticipación. Puede hacerlo a través de nuestro sitio web, por teléfono o por correo electrónico."
    },
    {
      question: "¿Ofrecen terapia online?",
      answer: "Sí, todas nuestras terapias se ofrecen de forma online a través de plataformas seguras que garantizan la confidencialidad de la consulta."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center section-title">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
