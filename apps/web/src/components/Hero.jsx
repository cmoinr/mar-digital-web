import React from 'react';

export default function Hero({ headline, sub }) {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-extrabold mb-4">{headline}</h1>
      <p className="text-lg text-gray-600 mb-6">{sub}</p>
      <a
        href="#contacto"
        className="inline-block bg-brand text-white px-6 py-3 rounded shadow hover:bg-brand-dark transition"
      >
        Empezar
      </a>
    </div>
  );
}
