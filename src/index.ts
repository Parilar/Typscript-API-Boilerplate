import 'reflect-metadata';
import http from 'http';
import express from 'express';
import cors from 'cors'
import middleware from './api/middleware';
import routes from './api/routes';
import { applyMiddleware, applyRoutes } from './lib/routes';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import config from './mikro-orm.config';

const router = express();
const server = http.createServer(router);

router.use(cors())
router.options('*', cors());

process.on('uncaughtException', function (err) {
    //TODO: Send email to administrator
});

MikroORM.init<MySqlDriver>(config).then(async (orm) => {
    console.log('Database Connection established!');

    applyMiddleware(middleware, router);

    router.use((req, res, next) => {
        RequestContext.create(orm.em, next);
    });

    await applyRoutes(routes, router);
 
    server.listen(process.argv[2], () => console.log(`Server is running on Port ${process.argv[2]}...`));
})
.catch((error) => console.log(error));