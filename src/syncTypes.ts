import createConnectionPool, {sql} from '@databases/mysql';
import config from './config';
import fs from 'fs';

async function sync() {
    const db = createConnectionPool(config.DB_STRING);
    const names = await db.query(sql`SELECT name FROM security_permission`);

    fs.readFile('./src/types.ts', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        let arr = [];

        names.forEach((ele)=>{
            arr.push(ele.name);
        });

        var result = data.replace(/export const permissions = \[(.*?)\] as const;/g, 'export const permissions = '+JSON.stringify(arr)+' as const;');

        fs.writeFile('./src/types.ts', result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });

    await db.dispose();
}

sync();