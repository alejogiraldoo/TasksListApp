import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TransformerStringsPipe } from 'src/shared/pipes/transform-strings/transformer-strings.pipe';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(
        private readonly tasksService: TasksService
    ){}

    @Get('all')
    getTasks(): Promise<Task[]> {
        return this.tasksService.getTasks();
    } 

    @Post('create')
    createTask(@Body(TransformerStringsPipe) task: CreateTaskDto): Promise<Task | HttpException> {
        return this.tasksService.createTask(task);
    }

    @Put('update/:id')
    updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body(TransformerStringsPipe) task: UpdateTaskDto
    ): Promise<Task | HttpException> {
        return this.tasksService.updateTask(id, task);
    }

    @Delete('remove/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<Task | HttpException>{
        return this.tasksService.deleteTask(id);
    }
}
