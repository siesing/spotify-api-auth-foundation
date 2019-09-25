const fastify = require("fastify")({
  logger: true
});

fastify.register(require("fastify-cookie"));

// Routes
fastify.get("/", async (req, reply) => {
  reply.send("Hardrock hallelujah!");
});
fastify.register(require("./routes/login"));
fastify.register(require("./routes/callback"));
fastify.register(require("./routes/refresh"));

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
start();
