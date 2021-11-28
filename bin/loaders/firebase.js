"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.auth = exports.defaultApp = void 0;
var firebase_admin_1 = require("firebase-admin");
exports.defaultApp = (0, firebase_admin_1.initializeApp)({
    credential: firebase_admin_1.credential.applicationDefault(),
});
exports.auth = exports.defaultApp.auth();
exports.database = exports.defaultApp.database();
