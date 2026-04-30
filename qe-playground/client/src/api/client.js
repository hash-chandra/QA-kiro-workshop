const BASE = 'http://localhost:3000/api';
const opts = { credentials: 'include', headers: { 'Content-Type': 'application/json' } };

export async function login(email, password) {
  const res = await fetch(`${BASE}/auth/login`, { ...opts, method: 'POST', body: JSON.stringify({ email, password }) });
  return res.json();
}

export async function logout() {
  await fetch(`${BASE}/auth/logout`, { ...opts, method: 'POST' });
}

export async function getMe() {
  const res = await fetch(`${BASE}/auth/me`, { ...opts });
  if (!res.ok) return null;
  return res.json();
}

export async function getTasks(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/tasks${qs ? `?${qs}` : ''}`, { ...opts });
  return res.json();
}

export async function createTask(data) {
  const res = await fetch(`${BASE}/tasks`, { ...opts, method: 'POST', body: JSON.stringify(data) });
  return res.json();
}

export async function updateTask(id, data) {
  const res = await fetch(`${BASE}/tasks/${id}`, { ...opts, method: 'PUT', body: JSON.stringify(data) });
  return res.json();
}

export async function deleteTask(id) {
  await fetch(`${BASE}/tasks/${id}`, { ...opts, method: 'DELETE' });
}
