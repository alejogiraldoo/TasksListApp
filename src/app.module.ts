import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [TasksModule, SubjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
