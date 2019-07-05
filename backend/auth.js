"use strict";
exports.__esModule = true;
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
exports.handleAuthentication = function (req, res) {
    var user = req.body;
    //console.log(user)
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        /*
            sub: refere-se a identificação do usuário
            iss: refere-se a identificação de quem está fornecendo o token (no caso é a própria aplicação)
        */
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, api_config_1.apiConfig.secret);
        res.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        // 403 - acesso negado para esse usuário
        res.status(403).json({ message: 'Dados inválidos!' });
    }
};
function isValid(user) {
    if (!user)
        return false;
    var dbUser = users_1.users[user.email];
    return dbUser && dbUser.matches(user);
}
