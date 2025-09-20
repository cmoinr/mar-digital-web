import React, { useState } from 'react';

export default function LeadForm() {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ email: '', nombre: '' });

  async function submit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/api/v1/leads`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 max-w-md">
      <input
        type="text"
        placeholder="Nombre"
        className="w-full border rounded px-3 py-2"
        value={form.nombre}
        onChange={e=>setForm({...form, nombre:e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Correo"
        className="w-full border rounded px-3 py-2"
        value={form.email}
        onChange={e=>setForm({...form, email:e.target.value})}
        required
      />
      <button
        disabled={status==='loading'}
        className="bg-brand text-white px-5 py-2 rounded font-semibold hover:bg-brand-dark disabled:opacity-60"
      >
        {status==='loading' ? 'Enviando...' : 'Enviar'}
      </button>
      {status==='success' && <p className="text-green-600 text-sm">¡Gracias! Te contactaremos.</p>}
      {status==='error' && <p className="text-red-600 text-sm">Error. Intenta de nuevo.</p>}
    </form>
  );
}
