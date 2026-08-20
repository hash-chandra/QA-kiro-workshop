import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/users.js';
import unstableRoutes from './routes/unstable.js';

const fastify = Fastify({ logger: true });

// @fastify/cors v11 defaults `methods` to 'GET,HEAD,POST', so browser preflights
// for PUT/PATCH/DELETE were rejected and task edit/delete silently failed in the UI
// (API tests still passed because Playwright's request context does not enforce CORS).
await fastify.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});
await fastify.register(cookie);
await fastify.register(authRoutes);
await fastify.register(taskRoutes);
await fastify.register(userRoutes);
await fastify.register(unstableRoutes);

// Health check
fastify.get('/api/health', async () => ({ status: 'ok' }));

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
