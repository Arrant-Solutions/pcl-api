"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (authorizedRoles) {
    return function (req, res, next) {
        if (!authorizedRoles.find(function (item) { return item === req.user.user_group.user_group_name; })) {
            return res.status(401).json({ statusCode: 401, data: 'Unauthorized' });
        }
        return next();
    };
});
