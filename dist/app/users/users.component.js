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
 * @created_on: 09/10/2016
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var users_service_1 = require("./services/users.service");
var session_1 = require("../common/session");
var UsersComponent = (function () {
    function UsersComponent(router, usersService) {
        this.router = router;
        this.usersService = usersService;
        this.users = [];
    }
    UsersComponent.prototype.loadUsers = function () {
        var _this = this;
        this.usersService.getUsers()
            .subscribe(function (users) { _this.users = users; }, function (err) { console.log(err); });
    };
    UsersComponent.prototype.ngOnInit = function () {
        if (session_1.Session.auth && session_1.Session.auth.user) {
            this.current_user = session_1.Session.auth.user;
            if (this.current_user.role == 'admin') {
                this.loadUsers();
            }
            else {
                this.router.navigate(['/login']);
            }
        }
        ;
    };
    UsersComponent.prototype.editUser = function (user) {
        this.router.navigate(['/edit_user', user.id]);
    };
    UsersComponent.prototype.newUser = function () {
        this.router.navigate(['/new_user']);
    };
    UsersComponent.prototype.makeSupportAgent = function (user, checked) {
        var _this = this;
        if (checked) {
            user.role = 'support_agent';
        }
        else {
            user.role = '';
        }
        this.usersService.updateUser(user).subscribe(function (result) {
            _this.loadUsers();
            console.log('after update', _this.users);
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    UsersComponent.prototype.deleteTicket = function (user) {
        var _this = this;
        this.usersService.removeUser("" + user.id).subscribe(function (users) {
            _this.loadUsers();
            console.log('after delete', _this.users);
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'users',
            templateUrl: 'app/users/users.component.html',
            providers: [users_service_1.UsersService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, users_service_1.UsersService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
