"use strict";
var Auth = (function () {
    function Auth(success, user) {
        this.success = success;
        this.user = user;
    }
    return Auth;
}());
exports.Auth = Auth;
