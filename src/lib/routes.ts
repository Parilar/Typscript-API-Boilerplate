import { Router, Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { RequestPayload, Wrapper, Route } from '../types';
import config from '../config';
import { getRepository } from 'typeorm';
import { SecurityRank } from '../database/entities/SecurityRank';

export let ranks = new Map<number, SecurityRank>();

export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};

export async function applyRoutes(routes: Route[], router: Router) {
    setupPermissions();

    for (const route of routes) {
        const { method, path, secure, permission, handler } = route;        

        if (secure) {
            (router as any)[method](path, [checkSecurity, checkPermission(permission)], handler);
        } else {
            (router as any)[method](path, [], handler);
        }
    }
}

function checkSecurity(req: Request, res: Response, next: NextFunction) {
    var token: string;

    if (req.headers.authorization) token = req.headers.authorization.split('Bearer ')[1];

    if (token) {
        jwt.verify(token as string, config.JWT_SECRET, function (err, payload) {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                req.payload = payload as RequestPayload;
                next();
            }
        });
    } else {
        res.status(401).send({
            message: 'No token provided.'
        });
    }
}

function checkPermission(_permission: string) {
    return (req: Request, res, next) => {
        var rank = ranks.get(req.payload.rank);
        var permission = rank.securityPermissions.find(e => e.name === _permission);

        if(permission != null){
            return next();
        }else{
            return res.status(403).send({
                message: 'No Permission'
            });
        }
    };
}

async function setupPermissions() {
    var data = await getRepository(SecurityRank).find({relations : ['securityPermissions']});
    ranks = new Map(data.map(i => [i.id, i]));
}