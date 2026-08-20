const BASE = 'http://localhost:3000/api';

/**
 * Build a fetch init object.
 *
 * The JSON content-type is only attached when there is actually a body: Fastify
 * rejects a bodyless request that declares `application/json` with
 * FST_ERR_CTP_EMPTY_JSON_BODY (400), which previously broke logout and delete.
 */
function init(method, body) {
  const config = { credentials: 'include', method };
  if (body !== undefined) {
    config.headers = { 'Content-Type': 'application/json' };
    config.body = JSON.stringify(body);
  }
  return config;
}

export async function login(email, password) {
  const res = await fetch(`${BASE}/auth/login`, init('POST', { email, password }));
  return res.json();
}

export async function logout() {
  await fetch(`${BASE}/auth/logout`, init('POST'));
}

export async function getMe() {
  const res = await fetch(`${BASE}/auth/me`, init('GET'));
  if (!res.ok) return null;
  return res.json();
}

export async function getTasks(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/tasks${qs ? `?${qs}` : ''}`, init('GET'));
  return res.json();
}

export async function createTask(data) {
  const res = await fetch(`${BASE}/tasks`, init('POST', data));
  return res.json();
}

export async function updateTask(id, data) {
  const res = await fetch(`${BASE}/tasks/${id}`, init('PUT', data));
  return res.json();
}

export async function deleteTask(id) {
  await fetch(`${BASE}/tasks/${id}`, init('DELETE'));
}
