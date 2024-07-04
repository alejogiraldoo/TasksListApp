import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { SubjectsService } from 'src/subjects/subjects.service';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
        private readonly subjectsService: SubjectsService
    ){}

    async getTasks(){
        return await this.taskRepository.find({
            relations: ['subject']
        });
    }

    private async getTaskById(id: number){
        const taskFound = await this.taskRepository.findOne({
            where: {
                id: id
            }
        });

        if(!taskFound) return new HttpException('Task not found', HttpStatus.NOT_FOUND);
        return taskFound;
    }

    async createTask(task: CreateTaskDto){
        const taskFound = await this.taskRepository.findOne({
            where: {
                name: task.name
            }
        });

        const subjectFound = await this.subjectsService.getSubjectById(task.subjectId);

        if(taskFound) return new HttpException('Task already exists', HttpStatus.CONFLICT);
        if(!subjectFound) return new HttpException('Subject not found', HttpStatus.NOT_FOUND);

        const newTask = this.taskRepository.create(task);
        return this.taskRepository.save(newTask);
    }

    async updateTask(id: number, task: UpdateTaskDto){
        const taskFound = await this.getTaskById(id);

        if(!taskFound) return new HttpException('Task not found', HttpStatus.NOT_FOUND);

        const updatedTask = Object.assign(taskFound, task);
        return this.taskRepository.save(updatedTask);
    }

    async deleteTask(id: number){
        const taskFound = await this.getTaskById(id);

        if(!taskFound) return new HttpException('Task not found', HttpStatus.NOT_FOUND);

        this.taskRepository.delete({id});
        return taskFound;
    }
}
