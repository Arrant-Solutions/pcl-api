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
exports.Feedback = exports.FeedbackCreate = void 0;
// eslint-disable-next-line max-classes-per-file
var class_validator_1 = require("class-validator");
var IModel_1 = require("./IModel");
var FeedbackCreate = /** @class */ (function () {
    function FeedbackCreate() {
    }
    Object.defineProperty(FeedbackCreate.prototype, "assign", {
        set: function (_a) {
            var feedback_id = _a.feedback_id, rating = _a.rating, message = _a.message, user_id = _a.user_id;
            this.feedback_id = feedback_id;
            this.rating = rating;
            this.message = message;
            this.user_id = user_id;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsPositive)(),
        (0, class_validator_1.IsInt)()
    ], FeedbackCreate.prototype, "feedback_id", void 0);
    __decorate([
        (0, class_validator_1.IsPositive)(),
        (0, class_validator_1.Max)(5),
        (0, class_validator_1.Min)(1)
    ], FeedbackCreate.prototype, "rating", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MaxLength)(500, { message: 'Message should not be more than 500 characters' })
    ], FeedbackCreate.prototype, "message", void 0);
    __decorate([
        (0, class_validator_1.IsPositive)(),
        (0, class_validator_1.IsInt)()
    ], FeedbackCreate.prototype, "user_id", void 0);
    return FeedbackCreate;
}());
exports.FeedbackCreate = FeedbackCreate;
var Feedback = /** @class */ (function (_super) {
    __extends(Feedback, _super);
    function Feedback(arg) {
        var _this = _super.call(this) || this;
        if (arg.first_name && arg.last_name) {
            _this.feedback_id = arg.feedback_id;
            _this.rating = arg.rating;
            _this.message = arg.message;
            _this.user = {
                user_id: arg.user_id,
                first_name: arg.first_name,
                last_name: arg.last_name,
                email: arg.email,
                phone: arg.phone,
                date_of_birth: arg.date_of_birth,
                user_group: {
                    user_group_id: arg.user_group_id,
                    user_group_name: arg.user_group_name,
                },
                country: {
                    country_id: arg.country_id,
                    country_name: arg.country_name,
                    country_abbr: arg.country_abbr,
                    country_code: arg.country_code,
                },
                gender: {
                    gender_id: arg.gender_id,
                    gender_name: arg.gender_name,
                },
                branch: {
                    branch_id: arg.branch_id,
                    branch_name: arg.branch_name,
                },
                user_status: {
                    user_status_id: arg.user_status_id,
                    user_status_name: arg.user_status_name,
                },
            };
        }
        return _this;
    }
    return Feedback;
}(IModel_1.Model));
exports.Feedback = Feedback;
