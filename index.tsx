import { FastifyReply, FastifyRequest } from "fastify";
import pino from "pino";
import { fastify } from "fastify";

const server = require("fastify")();

server.register(
  require("fastify-cors"),
  (instance: any) => (req: FastifyRequest, callback: any) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true,
    };

    if (req.headers.origin) {
      if (
        /^localhost$/m.test(req.headers.origin) ||
        /^127\.0\.0\.1$/m.test(req.headers.origin)
      ) {
        corsOptions.origin = false;
      }
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  }
);

server.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ token: "world" });
});

server.listen(8080);
