"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another && this.email === another.email && this.password === another.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "higor@gmail.com": new User("higor", "higor@gmail.com", "higor21carvalho"),
    "felype@gmail.com": new User("felype", "felype@gmail.com", "felype21carvalho"),
    "silva@gmail.com": new User("silva", "silva@gmail.com", "silva21carvalho")
};
