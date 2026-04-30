import { credentials, getUsers } from '../store.js';

const loginSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 1 },
    },
  },
};

export default async function authRoutes(fastify) {
  fastify.post('/api/auth/login', { schema: loginSchema }, async (req, reply) => {
    const { email, password } = req.body;
    if (credentials[email] && credentials[email] === password) {
      const user = getUsers().find(u => u.email === email);
      reply.setCookie('session', email, { path: '/', httpOnly: true });
      return { success: true, user };
    }
    return reply.status(401).send({ success: false, error: 'Invalid email or password' });
  });

  fastify.post('/api/auth/logout', async (_req, reply) => {
    reply.clearCookie('session', { path: '/' });
    return { success: true };
  });

  fastify.get('/api/auth/me', async (req, reply) => {
    const session = req.cookies.session;
    if (!session) return reply.status(401).send({ error: 'Not authenticated' });
    const user = getUsers().find(u => u.email === session);
    if (!user) return reply.status(401).send({ error: 'Not authenticated' });
    return { user };
  });
}
