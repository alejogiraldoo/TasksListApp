import { Subject } from "src/subjects/entities/subject.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar', 
        length: 50, 
        nullable: false,
        unique: true
    })
    name: string;

    @Column({
        type: 'varchar', 
        length: 150,
        nullable: true
    })
    description: string;

    @Column({
        type: 'date',
        nullable: true
    })
    date: Date;

    @Column()
    subjectId: number;

    @ManyToOne(() => Subject, subject => subject.tasks, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    subject: Subject;
}