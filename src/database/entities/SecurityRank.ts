import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SecurityPermission } from "./SecurityPermission";
import { User } from "./User";

@Entity("security_rank", { schema: "api" })
export class SecurityRank {
  @PrimaryGeneratedColumn({ type: "smallint", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @ManyToMany(
    () => SecurityPermission,
    (securityPermission) => securityPermission.securityRanks
  )
  @JoinTable({
    name: "security_rank_permission",
    joinColumns: [{ name: "rank_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "permission_id", referencedColumnName: "id" }],
    schema: "api",
  })
  securityPermissions: SecurityPermission[];

  @OneToMany(() => User, (user) => user.rank2)
  users: User[];
}
