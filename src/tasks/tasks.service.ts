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

        if(!taskFound) throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        return taskFound;
    }

    private async getTaskByName(name: string) {
        const taskFound = await this.taskRepository.findOne({
            where: {
                name: name
            }
        });

        if (!taskFound) throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        return taskFound;
    }

    async createTask(task: CreateTaskDto){
        await this.subjectsService.getSubjectById(task.subjectId);
        
        try{
            const taskFound = await this.getTaskByName(task.name);
            if(taskFound) throw new HttpException('Task already exists', HttpStatus.CONFLICT);
        } catch (error) {
            if(error instanceof HttpException && error.getStatus() === HttpStatus.NOT_FOUND){
                const newTask = this.taskRepository.create(task);
                return await this.taskRepository.save(newTask);
            }
            throw error;
        }
    }

    async updateTask(id: number, task: UpdateTaskDto){
        const [existingTaskById, existingTaskByName] : [Task | HttpException, Task | HttpException] = await Promise.all([
            this.getTaskById(id).catch(error => error),
            this.getTaskByName(task.name).catch(error => error)
        ]);

        if (existingTaskById instanceof HttpException) throw existingTaskById;
        

        if (!(existingTaskByName instanceof HttpException))
            throw new HttpException('Task already exists', HttpStatus.CONFLICT);

        const updatedTask = Object.assign(existingTaskById, task);
        return this.taskRepository.save(updatedTask);
    }

    async deleteTask(id: number){
        const taskFound = await this.getTaskById(id);

        this.taskRepository.delete({id});
        return taskFound;
    }
}
