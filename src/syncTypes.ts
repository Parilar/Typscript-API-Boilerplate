import fs from 'fs';
import config from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
import { SecurityPermission } from './database/entities/SecurityPermission';

(async () => {
    const orm = await MikroORM.init(config);
    const names = await orm.em.fork().find(SecurityPermission, {});

    fs.readFile('./src/types.ts', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        const arr : string[] = [];

        names.forEach((ele : SecurityPermission)=>{
            arr.push(ele.name as string);
        });

        var result = data.replace(/export const permissions = \[(.*?)\] as const;/g, 'export const permissions = '+JSON.stringify(arr)+' as const;');

        fs.writeFile('./src/types.ts', result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    }); 
    await orm.close(true);
})();