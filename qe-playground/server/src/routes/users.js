import { getUsers, getUser, createUser, updateUser, deleteUser } from '../store.js';

const userSchema = {
  body: {
    type: 'object',
    required: ['name', 'email', 'role'],
    properties: {
      name: { type: 'string', minLength: 1 },
      email: { type: 'string', format: 'email' },
      role: { type: 'string', enum: ['admin', 'tester'] },
    },
  },
};

export default async function userRoutes(fastify) {
  fastify.get('/api/users', async () => getUsers());

  fastify.get('/api/users/:id', async (req, reply) => {
    const user = getUser(Number(req.params.id));
    if (!user) return reply.status(404).send({ error: 'User not found' });
    return user;
  });

  fastify.post('/api/users', { schema: userSchema }, async (req, reply) => {
    const user = createUser(req.body);
    return reply.status(201).send(user);
  });

  fastify.put('/api/users/:id', async (req, reply) => {
    const user = updateUser(Number(req.params.id), req.body);
    if (!user) return reply.status(404).send({ error: 'User not found' });
    return user;
  });

  fastify.delete('/api/users/:id', async (req, reply) => {
    const deleted = deleteUser(Number(req.params.id));
    if (!deleted) return reply.status(404).send({ error: 'User not found' });
    return { success: true };
  });
}
