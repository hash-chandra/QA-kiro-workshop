import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/users.js';
import unstableRoutes from './routes/unstable.js';

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: 'http://localhost:5173', credentials: true });
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
