"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
//verify if user is authorized 
exports.handleAuthorization = function (req, res, next) {
    var token = extractToken(req);
    if (!token) {
        // user ditn't send the token
        res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
        res.status(401).json({ message: 'Você precisa se autenticar.' });
    }
    else {
        // the token sent by user is not valid
        jwt.verify(token, api_config_1.apiConfig.secret, function (err, decoded) {
            if (decoded) {
                next();
            }
            else {
                // if token is not valid, send access denied
                res.status(403).json({ message: 'Não autorizado.' });
            }
        });
    }
};
// extract the token sent by client
function extractToken(req) {
    var token = undefined;
    /*
        The user/client has to sent, as a 'Header', a token of authorization as following:
        * Authorization: Bearer ZZZZ.YYYY.WWW
    */
    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}
