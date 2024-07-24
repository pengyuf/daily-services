import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Daily {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: false
    })
    content: string;

    @Column({
        type: 'json',
        nullable: true,
    })
    sourceList?: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: true
    })
    weather?: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: true
    })
    address?: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: true
    })
    latLon?: string;

    @Column({
        type: 'int',
        nullable: false
    })
    wordTotal: number;

    @CreateDateColumn()
    createdTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

    @DeleteDateColumn()
    delTime: Date;
}