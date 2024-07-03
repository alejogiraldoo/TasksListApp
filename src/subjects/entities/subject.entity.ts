import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar', 
        length: 50, 
        nullable: false, 
        unique: true
    })
    name: string;

    @OneToMany(() => Task, task => task.subject)
    tasks: Task[];
}