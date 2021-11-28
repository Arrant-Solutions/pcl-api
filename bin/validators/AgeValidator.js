"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
var class_validator_1 = require("class-validator");
var moment = require("moment");
var IsAppropriateAge = /** @class */ (function () {
    function IsAppropriateAge() {
    }
    // eslint-disable-next-line no-unused-vars
    IsAppropriateAge.prototype.validate = function (text, args) {
        var age = moment().diff(text, 'years');
        return age > 0 && age < 150;
    };
    IsAppropriateAge.prototype.defaultMessage = function (args) {
        var dob = new Date(args.value);
        if (Number.isNaN(dob.valueOf())) {
            return 'Please input a valid date of birth';
        }
        var age = moment().diff(args.value, 'years');
        if (age < 1) {
            return 'You might be too old to use the app';
        }
        if (age > 150) {
            return 'You might be too young to use the app';
        }
        return args.value + " does not look like a valid date of birth";
    };
    IsAppropriateAge = __decorate([
        (0, class_validator_1.ValidatorConstraint)({ name: 'customText', async: false })
    ], IsAppropriateAge);
    return IsAppropriateAge;
}());
exports.default = IsAppropriateAge;
