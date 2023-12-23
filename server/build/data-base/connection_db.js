"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
const config_1 = require("../src/config");
exports.pool = (0, promise_1.createPool)({
    host: config_1.DB_HOST,
    user: config_1.DB_USER,
    password: config_1.DB_PASS,
    port: Number(config_1.DB_PORT),
    database: config_1.DB_NAME
});
