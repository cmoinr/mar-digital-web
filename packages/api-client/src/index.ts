import type { paths } from './generated/types';

export type Lead = {
  id: number;
  nombre: string;
  email: string;
};

type CreateLeadRequest = {
  nombre: string;
  email: string;
};

const API_BASE = process.env.PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function createLead(data: CreateLeadRequest): Promise<Lead> {
  const res = await fetch(`${API_BASE}/api/v1/leads`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error creando lead');
  return res.json();
}
