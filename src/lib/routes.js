"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
exports.ranks = new Map();
exports.applyMiddleware = (middlewareWrappers, router) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};
function applyRoutes(routes, router) {
    return __awaiter(this, void 0, void 0, function* () {
        setupPermissions();
        for (const route of routes) {
            const { method, path, secure, permission, handler } = route;
            if (secure) {
                router[method](path, [checkSecurity, checkPermission(permission)], handler);
            }
            else {
                router[method](path, [], handler);
            }
        }
    });
}
exports.applyRoutes = applyRoutes;
function checkSecurity(req, res, next) {
    var token;
    if (req.headers.authorization)
        token = req.headers.authorization.split('Bearer ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET, function (err, payload) {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            else {
                req.payload = payload;
                next();
            }
        });
    }
    else {
        res.status(401).send({
            message: 'No token provided.'
        });
    }
}
function checkPermission(_permission) {
    return (req, res, next) => {
        var rank = exports.ranks.get(req.payload.rank);
        var permission = rank.permission.getItems().find(e => e.name === _permission);
        if (permission != null) {
            return next();
        }
        else {
            return res.status(403).send({
                message: 'No Permission'
            });
        }
    };
}
function setupPermissions() {
    return __awaiter(this, void 0, void 0, function* () {
        //var data = await security_rank(db).find().all();    
        //ranks = new Map(data.map(i => [i.id, i]));
    });
}
//# sourceMappingURL=routes.js.map