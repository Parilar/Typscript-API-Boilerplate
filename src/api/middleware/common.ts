import { Router } from 'express';
import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';

export const handleCors = (router: Router) => router.use(cors());

export const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({ extended: true }));
    router.use(parser.json());
    router.use(parser.text());
};

export const handleCompression = (router: Router) => {
    router.use(compression());
};

export const logger = (router: Router) => {
    router.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
};
