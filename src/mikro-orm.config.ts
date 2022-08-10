import { Configuration, Options, ReflectMetadataProvider } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const config = {
  entities: ['./dist/database/entities'], // path to our JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/database/entities'], // path to our TS entities (src), relative to `baseDir`
  dbName: 'api',
  username: 'root',
  password: '123456',
  type: 'mysql',
  debug: true,
  discovery: {
    tsConfigPath: "./tsconfig.json",    
  },
} as Options<MySqlDriver>;

export default config;