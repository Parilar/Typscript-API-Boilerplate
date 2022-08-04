/**
 * !!! This file is autogenerated do not edit by hand !!!
 *
 * Generated by: @databases/pg-schema-print-types
 * Checksum: 3bSoaR05nGMB3t667L/LYH+cRII4PYMEW4Wf6tMbzaRMCn8N1vlozRqg7OaQadmc2+fBxbGp3GmFTzdKBvcjPQ==
 */

/* eslint-disable */
// tslint:disable

import SecurityPermission, {SecurityPermission_InsertParameters} from './security_permission'
import SecurityRank, {SecurityRank_InsertParameters} from './security_rank'
import SecurityRankPermission, {SecurityRankPermission_InsertParameters} from './security_rank_permission'
import User, {User_InsertParameters} from './user'

interface DatabaseSchema {
  security_permission: {record: SecurityPermission, insert: SecurityPermission_InsertParameters};
  security_rank: {record: SecurityRank, insert: SecurityRank_InsertParameters};
  security_rank_permission: {record: SecurityRankPermission, insert: SecurityRankPermission_InsertParameters};
  user: {record: User, insert: User_InsertParameters};
}
export default DatabaseSchema;

function serializeValue(_tableName: string, _columnName: string, value: unknown): unknown {
  return value;
}
export {serializeValue}
