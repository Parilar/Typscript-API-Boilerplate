import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { SecurityPermission } from './SecurityPermission';

@Entity()
export class SecurityRank {

  @PrimaryKey({ columnType: 'smallint' })
  id!: number;

  @Property({ length: 255, nullable: true })
  name?: string;

  @ManyToMany({ entity: () => SecurityPermission, joinColumn: 'rank_id', inverseJoinColumn: 'permission_id' })
  permission = new Collection<SecurityPermission>(this);

}
