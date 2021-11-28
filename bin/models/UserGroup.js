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
exports.UserGroup = void 0;
var class_validator_1 = require("class-validator");
var IModel_1 = require("./IModel");
var UserGroup = /** @class */ (function (_super) {
    __extends(UserGroup, _super);
    function UserGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UserGroup.prototype, "assign", {
        set: function (_a) {
            var user_group_id = _a.user_group_id, user_group_name = _a.user_group_name;
            this.user_group_id = user_group_id;
            this.user_group_name = user_group_name;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)()
    ], UserGroup.prototype, "user_group_id", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(30)
    ], UserGroup.prototype, "user_group_name", void 0);
    return UserGroup;
}(IModel_1.Model));
exports.UserGroup = UserGroup;
