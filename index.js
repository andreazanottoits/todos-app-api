"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const fastify_1 = require("fastify");
const server = (0, fastify_1.fastify)({
    logger: (0, pino_1.default)({ level: "info" }),
});
server.register(require("fastify-cors"), (instance) => (req, callback) => {
    const corsOptions = {
        // This is NOT recommended for production as it enables reflection exploits
        origin: true,
    };
    if (req.headers.origin) {
        if (/^localhost$/m.test(req.headers.origin)) {
            corsOptions.origin = false;
        }
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
});
server.post("/login", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ token: "world" });
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen(3000);
        console.log("Server started successfully");
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();
