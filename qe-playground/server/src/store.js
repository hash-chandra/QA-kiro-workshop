const users = [
  { id: 1, name: 'Admin User', email: 'admin@playground.dev', role: 'admin' },
  { id: 2, name: 'Test User', email: 'tester@playground.dev', role: 'tester' },
];

const tasks = [
  { id: 1, title: 'Write login tests', status: 'done', assignee: 'tester@playground.dev' },
  { id: 2, title: 'Automate search flow', status: 'in-progress', assignee: 'tester@playground.dev' },
  { id: 3, title: 'Review API contracts', status: 'todo', assignee: 'admin@playground.dev' },
  { id: 4, title: 'Fix flaky dashboard test', status: 'todo', assignee: 'tester@playground.dev' },
  { id: 5, title: 'Add accessibility checks', status: 'in-progress', assignee: 'admin@playground.dev' },
];

let nextUserId = 3;
let nextTaskId = 6;

export function getUsers() { return users; }
export function getUser(id) { return users.find(u => u.id === id); }
export function createUser(data) {
  const user = { id: nextUserId++, ...data };
  users.push(user);
  return user;
}
export function updateUser(id, data) {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...data };
  return users[idx];
}
export function deleteUser(id) {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
}

export function getTasks(filters = {}) {
  let result = tasks;
  if (filters.status) result = result.filter(t => t.status === filters.status);
  if (filters.assignee) result = result.filter(t => t.assignee === filters.assignee);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(t => t.title.toLowerCase().includes(q));
  }
  return result;
}
export function getTask(id) { return tasks.find(t => t.id === id); }
export function createTask(data) {
  const task = { id: nextTaskId++, ...data };
  tasks.push(task);
  return task;
}
export function updateTask(id, data) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...data };
  return tasks[idx];
}
export function deleteTask(id) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

// Valid credentials for login
export const credentials = {
  'admin@playground.dev': 'admin123',
  'tester@playground.dev': 'test123',
};
