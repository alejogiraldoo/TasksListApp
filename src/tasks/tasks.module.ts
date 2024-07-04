import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { SubjectsModule } from 'src/subjects/subjects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    SubjectsModule
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
