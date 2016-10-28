"use strict";
var Comment = (function () {
    function Comment(id, body, status, user_id, user_email, ticket_id, created_at, updated_at) {
        this.id = id;
        this.body = body;
        this.status = status;
        this.user_id = user_id;
        this.user_email = user_email;
        this.ticket_id = ticket_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    return Comment;
}());
exports.Comment = Comment;
