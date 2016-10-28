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
var comments_service_1 = require('./services/comments.service');
var comments_model_1 = require('./models/comments.model');
var session_1 = require('../common/session');
var CommentsComponent = (function () {
    function CommentsComponent(route, router, commentsService) {
        this.route = route;
        this.router = router;
        this.commentsService = commentsService;
        this.ticket_id = '';
        this.new_comment = '';
    }
    CommentsComponent.prototype.loadComments = function (ticket_id) {
        var _this = this;
        this.commentsService.getComments(this.ticket_id).subscribe(function (comments) { _this.comments = comments; }, function (err) { console.log(err); });
    };
    CommentsComponent.prototype.ngOnInit = function () {
        if (session_1.Session.auth && session_1.Session.auth.user) {
            this.current_user = session_1.Session.auth.user;
        }
        this.loadComments(this.ticket_id);
    };
    CommentsComponent.prototype.addComment = function () {
        var _this = this;
        var model = new comments_model_1.Comment(null, this.new_comment, null, null, null, (+this.ticket_id), null, null);
        console.log(model);
        this.commentsService.addComment(model)
            .subscribe(function (comment) {
            _this.new_comment = '';
            _this.loadComments(_this.ticket_id);
        }, function (err) { console.log(err); });
    };
    CommentsComponent.prototype.deleteComment = function (id) {
        var _this = this;
        this.commentsService.removeComment(id).subscribe(function (tickets) {
            _this.loadComments(_this.ticket_id);
            console.log('after delete', _this.comments);
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CommentsComponent.prototype, "ticket_id", void 0);
    CommentsComponent = __decorate([
        core_1.Component({
            selector: 'comments',
            templateUrl: 'app/comments/comments.component.html',
            providers: [comments_service_1.CommentsService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, comments_service_1.CommentsService])
    ], CommentsComponent);
    return CommentsComponent;
}());
exports.CommentsComponent = CommentsComponent;
