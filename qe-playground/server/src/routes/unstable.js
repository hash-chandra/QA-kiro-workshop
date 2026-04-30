export default async function unstableRoutes(fastify) {
  // Randomly delays 0-3s and fails ~30% of the time — for flaky test demos
  fastify.get('/api/unstable', async (_req, reply) => {
    const delay = Math.floor(Math.random() * 3000);
    await new Promise(r => setTimeout(r, delay));

    if (Math.random() < 0.3) {
      return reply.status(500).send({ error: 'Random server failure', delay });
    }
    return { success: true, delay, timestamp: Date.now() };
  });
}
