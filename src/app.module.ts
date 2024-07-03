import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule, 
    SubjectsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'taskslistapp',
      autoLoadEntities: true,
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
