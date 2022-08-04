import createConnectionPool, {sql} from '@databases/mysql';
import tables from '@databases/mysql-typed';
import config from '../config';
import DatabaseSchema, {serializeValue} from '../__generated__';

export {sql};

const db = createConnectionPool(config.DB_STRING);
export default db;

// You can list whatever tables you actually have here:
const {user} = tables<DatabaseSchema>({
  serializeValue,
});
export {user};