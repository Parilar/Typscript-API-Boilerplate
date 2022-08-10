import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SecurityRank } from "./SecurityRank";

@Index("rank", ["rank"], {})
@Entity("user", { schema: "api" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "username", nullable: true, length: 255 })
  username: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "first_name", nullable: true, length: 255 })
  firstName: string | null;

  @Column("varchar", { name: "last_name", nullable: true, length: 255 })
  lastName: string | null;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "password_hash", length: 255 })
  passwordHash: string;

  @Column("smallint", { name: "rank", nullable: true, unsigned: true })
  rank: number | null;

  @ManyToOne(() => SecurityRank, (securityRank) => securityRank.users, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "rank", referencedColumnName: "id" }])
  rank2: SecurityRank;
}
