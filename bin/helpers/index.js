"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnderAge = exports.getAgeYears = void 0;
var moment = require("moment");
exports.getAgeYears = function (date, format) {
    if (format === void 0) { format = 'YYYY-MM-DD'; }
    var result = moment(date, format).fromNow();
    console.log(date);
    if (!/year/i.test(result))
        return 0;
    return Number(result.split(' ')[0]);
};
exports.isUnderAge = function (date, format) {
    if (format === void 0) { format = 'YYYY-MM-DD'; }
    return exports.getAgeYears(date, format) < 2;
};
