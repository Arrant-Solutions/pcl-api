"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favorite = void 0;
var class_validator_1 = require("class-validator");
var Favorite = /** @class */ (function () {
    function Favorite() {
    }
    Object.defineProperty(Favorite.prototype, "assign", {
        set: function (_a) {
            var favorite_id = _a.favorite_id, resource_id = _a.resource_id, user_id = _a.user_id;
            this.favorite_id = favorite_id;
            this.resource_id = resource_id;
            this.user_id = user_id;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsInt(),
        class_validator_1.IsPositive()
    ], Favorite.prototype, "favorite_id", void 0);
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsPositive()
    ], Favorite.prototype, "resource_id", void 0);
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsPositive()
    ], Favorite.prototype, "user_id", void 0);
    return Favorite;
}());
exports.Favorite = Favorite;
