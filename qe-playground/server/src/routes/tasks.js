import { getTasks, getTask, createTask, updateTask, deleteTask } from '../store.js';

const taskSchema = {
  body: {
    type: 'object',
    required: ['title', 'status'],
    properties: {
      title: { type: 'string', minLength: 1 },
      status: { type: 'string', enum: ['todo', 'in-progress', 'done'] },
      assignee: { type: 'string' },
    },
  },
};

export default async function taskRoutes(fastify) {
  fastify.get('/api/tasks', async (req) => {
    const { status, assignee, search } = req.query;
    return getTasks({ status, assignee, search });
  });

  fastify.get('/api/tasks/:id', async (req, reply) => {
    const task = getTask(Number(req.params.id));
    if (!task) return reply.status(404).send({ error: 'Task not found' });
    return task;
  });

  fastify.post('/api/tasks', { schema: taskSchema }, async (req, reply) => {
    const task = createTask(req.body);
    return reply.status(201).send(task);
  });

  fastify.put('/api/tasks/:id', async (req, reply) => {
    const task = updateTask(Number(req.params.id), req.body);
    if (!task) return reply.status(404).send({ error: 'Task not found' });
    return task;
  });

  fastify.delete('/api/tasks/:id', async (req, reply) => {
    const deleted = deleteTask(Number(req.params.id));
    if (!deleted) return reply.status(404).send({ error: 'Task not found' });
    return { success: true };
  });
}
