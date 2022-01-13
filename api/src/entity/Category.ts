import { BaseEntity } from "./BaseEntity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'Category' })
export class Category extends BaseEntity {

  @Column()
  name: string 

  @Column()
  description: string

  

}