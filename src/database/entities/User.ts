import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { SecurityRank } from './SecurityRank';

@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @Property({ length: 255, nullable: true })
  username?: string;

  @Property({ length: 255, nullable: true })
  email?: string;

  @Property({ length: 255, nullable: true })
  firstName?: string;

  @Property({ length: 255, nullable: true })
  lastName?: string;

  @Property({ length: 255 })
  password!: string;

  @Property({ length: 255 })
  passwordHash!: string;

  @ManyToOne({ entity: () => SecurityRank, fieldName: 'rank', onUpdateIntegrity: 'cascade', onDelete: 'cascade', nullable: true, index: 'rank' })
  rank?: SecurityRank;

}
