"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 12/10/2016
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var users_service_1 = require('./services/users.service');
var session_1 = require('../common/session');
var users_model_1 = require('./models/users.model');
// Component decorator
var UserFormComponent = (function () {
    function UserFormComponent(route, router, userService) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.model = new users_model_1.User(null, '', '', '', '');
        this.editing = false;
        this.confirm_password = '';
        this.password_mismatch = false;
    }
    UserFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (session_1.Session.auth && session_1.Session.auth.user) {
            this.current_user = session_1.Session.auth.user;
        }
        this.route.params.forEach(function (params) {
            var user_id = +params['id']; // (+) converts string 'id' to a number
            if (user_id) {
                _this.userService.getUser(user_id)
                    .subscribe(function (user) {
                    _this.model = user;
                    _this.editing = true;
                }, function (err) { console.log(err); });
            }
        });
    };
    UserFormComponent.prototype.submitUser = function () {
        var _this = this;
        // Variable to hold a reference of addUser/updateUser
        var userOperation;
        if (this.confirm_password != this.model.password) {
            this.password_mismatch = true;
            return;
        }
        if (!this.editing) {
            // Create a new user
            userOperation = this.userService.addUser(this.model);
        }
        else {
            // Update an existing user
            userOperation = this.userService.updateUser(this.model);
        }
        // Subscribe to observable
        userOperation.subscribe(function (users) { _this.router.navigate(['/list_users']); }, function (err) { console.log(err); });
    };
    UserFormComponent.prototype.cancelForm = function () {
        this.router.navigate(['/list_users']);
    };
    UserFormComponent = __decorate([
        core_1.Component({
            selector: 'user-form',
            templateUrl: 'app/users/user-form.component.html',
            providers: [users_service_1.UsersService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, users_service_1.UsersService])
    ], UserFormComponent);
    return UserFormComponent;
}());
exports.UserFormComponent = UserFormComponent;
