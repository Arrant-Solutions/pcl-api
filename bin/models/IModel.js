"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var class_transformer_1 = require("class-transformer");
var Model = /** @class */ (function () {
    function Model() {
    }
    __decorate([
        class_transformer_1.Type(function () { return Date; })
    ], Model.prototype, "created_at", void 0);
    __decorate([
        class_transformer_1.Type(function () { return Date; })
    ], Model.prototype, "updated_at", void 0);
    return Model;
}());
exports.Model = Model;
