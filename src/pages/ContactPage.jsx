
import React from 'react';
import { motion } from 'framer-motion';
import ContactHeader from '@/components/contact/ContactHeader';
import ContactInfoSection from '@/components/contact/ContactInfoSection';
import ContactFormSection from '@/components/contact/ContactFormSection';
import FaqSection from '@/components/contact/FaqSection';

const ContactPage = () => {
  return (
    <div className="pt-24">
      <ContactHeader />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfoSection />
            <ContactFormSection />
          </div>
        </div>
      </section>
      <FaqSection />
    </div>
  );
};

export default ContactPage;
