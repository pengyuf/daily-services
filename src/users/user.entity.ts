import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false
    })
    password: string;

    @CreateDateColumn()
    createdTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

    @DeleteDateColumn()
    delTime: Date;
}