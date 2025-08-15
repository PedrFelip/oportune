import Fastify from "fastify";

const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid, hostname",
      },
    },
  },
});

app.get("/", async () => {
  return { message: "check" };
});

app.listen({ port: 3001 }).then(() => {
  console.log("rodando na porta 3001");
});
