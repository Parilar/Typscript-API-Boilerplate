import { Column, Entity, ManyToMany } from "typeorm";
import { SecurityRank } from "./SecurityRank";

@Entity("security_permission", { schema: "api" })
export class SecurityPermission {
  @Column("int", { primary: true, name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @ManyToMany(
    () => SecurityRank,
    (securityRank) => securityRank.securityPermissions
  )
  securityRanks: SecurityRank[];
}
