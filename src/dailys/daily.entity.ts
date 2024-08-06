import { Source } from "src/sources/source.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



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
        type: 'int',
        nullable: false
    })
    wordTotal: number;

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

    @OneToOne(()=>Source,(m)=>m.daily)
    sources:Source

    @CreateDateColumn()
    createdTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

    @DeleteDateColumn()
    delTime: Date;
}