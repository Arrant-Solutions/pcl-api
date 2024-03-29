"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
var class_validator_1 = require("class-validator");
var IModel_1 = require("./IModel");
var Author = /** @class */ (function (_super) {
    __extends(Author, _super);
    function Author() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Author.prototype, "assign", {
        set: function (_a) {
            var author_id = _a.author_id, title = _a.title, first_name = _a.first_name, last_name = _a.last_name, suffix = _a.suffix;
            this.author_id = author_id;
            this.title = title;
            this.first_name = first_name;
            this.last_name = last_name;
            this.suffix = suffix;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsPositive)(),
        (0, class_validator_1.IsInt)()
    ], Author.prototype, "author_id", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255)
    ], Author.prototype, "title", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(100)
    ], Author.prototype, "first_name", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(100)
    ], Author.prototype, "last_name", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255)
    ], Author.prototype, "suffix", void 0);
    return Author;
}(IModel_1.Model));
exports.Author = Author;
