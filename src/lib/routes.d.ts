import { Router } from 'express';
import { Wrapper, Route } from '../types';
import { SecurityRank } from '../database/entities/SecurityRank';
export declare let ranks: Map<number, SecurityRank>;
export declare const applyMiddleware: (middlewareWrappers: Wrapper[], router: Router) => void;
export declare function applyRoutes(routes: Route[], router: Router): Promise<void>;
