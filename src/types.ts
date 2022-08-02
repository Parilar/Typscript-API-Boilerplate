import { Router, Request, Response, NextFunction } from 'express';

export type Wrapper = (router: Router) => void;

export type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

const permissions =  [
    'wildcard'
] as const;

export type Permission = typeof permissions[number];

export type Route = {
    path: string;
    method: string;
    secure: boolean;
    permission : Permission;
    handler: Handler | Handler[];
};

export type RequestPayload = {
    userId: number;
    rank: number;
    accessToken: string;
};

declare global {
    namespace Express {
        interface Request {
            payload: RequestPayload;
        }
    }
}
