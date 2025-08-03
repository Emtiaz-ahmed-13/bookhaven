"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
prisma
    .$connect()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error("Failed to connect:", err));
exports.default = prisma;
