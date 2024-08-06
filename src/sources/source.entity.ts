import { Daily } from "src/dailys/daily.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Source {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: true
    })
    source1?: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: true
    })
    source2?: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: true
    })
    source3?: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: true
    })
    source4?: string;


    @OneToOne(()=>Daily,(m)=>m.sources)
    @JoinColumn()
    daily:Daily
}