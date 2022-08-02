import 'reflect-metadata';
import http from 'http';
import express from 'express';
import { createConnection, getManager, getRepository } from 'typeorm';
import cors from 'cors'

import middleware from './api/middleware';
import routes from './api/routes';
import { applyMiddleware, applyRoutes } from './lib/routes';

const router = express();
const server = http.createServer(router);

router.use(cors())
router.options('*', cors());

process.on('uncaughtException', function (err) {
    //TODO: Send email to administrator
});

createConnection()
    .then(async (connection) => {
        console.log('Database Connection established!');

        applyMiddleware(middleware, router);
        
        await applyRoutes(routes, router);
        
        server.listen(process.argv[2], () => console.log(`Server is running on Port ${process.argv[2]}...`));
    })
    .catch((error) => console.log(error));
    