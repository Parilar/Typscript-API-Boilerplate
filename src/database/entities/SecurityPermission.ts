import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class SecurityPermission {

  @PrimaryKey()
  id!: number;

  @Property({ length: 255, nullable: true })
  name?: string;

  @Property({ length: 255, nullable: true })
  description?: string;

}
