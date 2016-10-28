"use strict";
var User = (function () {
    function User(id, auth_token, role, email, password) {
        this.id = id;
        this.auth_token = auth_token;
        this.role = role;
        this.email = email;
        this.password = password;
    }
    return User;
}());
exports.User = User;
