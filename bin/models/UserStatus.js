"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
exports.UserStatus = void 0;
var class_validator_1 = require("class-validator");
var IModel_1 = require("./IModel");
var UserStatus = /** @class */ (function (_super) {
    __extends(UserStatus, _super);
    function UserStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UserStatus.prototype, "assign", {
        set: function (_a) {
            var user_status_id = _a.user_status_id, user_status_name = _a.user_status_name;
            this.user_status_id = user_status_id;
            this.user_status_name = user_status_name;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsInt(),
        class_validator_1.IsPositive()
    ], UserStatus.prototype, "user_status_id", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MaxLength(30)
    ], UserStatus.prototype, "user_status_name", void 0);
    return UserStatus;
}(IModel_1.Model));
exports.UserStatus = UserStatus;
