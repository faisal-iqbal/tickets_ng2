"use strict";
var Ticket = (function () {
    function Ticket(id, title, description, status, status_str, user_id, user_email, owner_id, owner_email, created_at, updated_at) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.status_str = status_str;
        this.user_id = user_id;
        this.user_email = user_email;
        this.owner_id = owner_id;
        this.owner_email = owner_email;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    return Ticket;
}());
exports.Ticket = Ticket;
