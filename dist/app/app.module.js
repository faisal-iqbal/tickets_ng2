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
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var login_component_1 = require('./login/login.component');
var nav_component_1 = require('./nav/nav.component');
var tickets_component_1 = require('./tickets/tickets.component');
var ticket_form_component_1 = require('./tickets/ticket-form.component');
var ticket_details_component_1 = require('./tickets/ticket-details.component');
var comments_component_1 = require('./comments/comments.component');
var users_component_1 = require('./users/users.component');
var user_form_component_1 = require('./users/user-form.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        component: login_component_1.LoginComponent,
                    },
                    {
                        path: 'login',
                        component: login_component_1.LoginComponent,
                    },
                    {
                        path: 'list_tickets',
                        component: tickets_component_1.TicketComponent
                    },
                    {
                        path: 'show_ticket/:id',
                        component: ticket_details_component_1.TicketDetailsComponent
                    },
                    {
                        path: 'edit_ticket/:id',
                        component: ticket_form_component_1.TicketFormComponent
                    },
                    {
                        path: 'new_ticket',
                        component: ticket_form_component_1.TicketFormComponent
                    },
                    {
                        path: 'list_comments',
                        component: comments_component_1.CommentsComponent
                    },
                    {
                        path: 'list_users',
                        component: users_component_1.UsersComponent,
                    },
                    {
                        path: 'edit_user/:id',
                        component: user_form_component_1.UserFormComponent,
                    },
                    {
                        path: 'new_user',
                        component: user_form_component_1.UserFormComponent,
                    }
                ])
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                nav_component_1.NavComponent,
                tickets_component_1.TicketComponent,
                ticket_form_component_1.TicketFormComponent,
                ticket_details_component_1.TicketDetailsComponent,
                comments_component_1.CommentsComponent,
                users_component_1.UsersComponent,
                user_form_component_1.UserFormComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
