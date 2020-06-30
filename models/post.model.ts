import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryColumn()
  id: number;
  @Column({ length: 256 })
  title: string;
  @Column("text")
  body: string;
}
