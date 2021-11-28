"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.client = exports.pool = void 0;
var pg_1 = require("pg");
var pgPromise = require("pg-promise");
var config_1 = require("../config");
var pgp = pgPromise({
    schema: process.env.ENV === 'production' ? ['public'] : ['staging'],
});
var connectionString = config_1.database.dbURL;
exports.pool = new pg_1.Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});
exports.client = new pg_1.Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});
exports.db = pgp({
    connectionString: connectionString,
    max: 30,
    ssl: {
        rejectUnauthorized: false,
    },
});
