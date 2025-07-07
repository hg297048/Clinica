
import React from 'react';

const AppointmentInfo = () => {
  const importantInfo = [
    { id: 1, text: "Todas las terapias se realizan de forma online." },
    { id: 2, text: "Las citas tienen una duración de 50 minutos." },
    { id: 3, text: "En caso de no poder asistir, por favor cancele su cita con al menos 24 horas de anticipación." },
    { id: 4, text: "Recibirá un correo electrónico de confirmación una vez que su cita haya sido procesada." },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 section-title">Información Importante</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-4">
              {importantInfo.map((item) => (
                <li key={item.id} className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-sm font-bold">{item.id}</span>
                  </div>
                  <p className="text-gray-700">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentInfo;
