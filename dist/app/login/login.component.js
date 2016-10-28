/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */
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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var login_service_1 = require("./services/login.service");
var session_1 = require("../common/session");
var LoginComponent = (function () {
    function LoginComponent(router, loginService) {
        this.router = router;
        this.loginService = loginService;
        this.email = '';
        this.password = '';
        this.signOut();
    }
    LoginComponent.prototype.signIn = function () {
        var _this = this;
        this.loginService.signIn(this.email, this.password)
            .subscribe(function (result) {
            //console.log(result);
            if (result.user) {
                session_1.Session.auth = result;
                _this.router.navigate(['/list_tickets']);
            }
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    LoginComponent.prototype.signOut = function () {
        if (session_1.Session.auth) {
            this.loginService.signOut()
                .subscribe(function (result) {
                console.log(result);
                session_1.Session.auth = null;
            }, function (err) {
                // Log errors if any
                console.log(err);
            });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/login/login.component.html',
            providers: [login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
