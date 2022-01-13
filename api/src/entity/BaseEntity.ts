import { Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, ObjectID } from "typeorm";

export abstract class BaseEntity {

	@ObjectIdColumn({type: 'uuid'})
	uid: ObjectID;

	@Column()
	active: boolean = true;

	@Column()
	deleted: boolean = false

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp" })
	updatedAt: Date;

}
