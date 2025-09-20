import React from 'react';
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 px-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
