"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnderAge = exports.getAgeYears = void 0;
var moment = require("moment");
var getAgeYears = function (date, format) {
    if (format === void 0) { format = 'YYYY-MM-DD'; }
    var result = moment(date, format).fromNow();
    console.log(date);
    if (!/year/i.test(result))
        return 0;
    return Number(result.split(' ')[0]);
};
exports.getAgeYears = getAgeYears;
var isUnderAge = function (date, format) {
    if (format === void 0) { format = 'YYYY-MM-DD'; }
    return (0, exports.getAgeYears)(date, format) < 2;
};
exports.isUnderAge = isUnderAge;
