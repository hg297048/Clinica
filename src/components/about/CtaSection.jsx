
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Comienza tu camino hacia el bienestar</h2>
          <p className="text-xl mb-8">
            Nuestro equipo está listo para ayudarte a alcanzar una mejor salud mental y emocional, con terapias online.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link to="/citas">Agendar una Cita</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
