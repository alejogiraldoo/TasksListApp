import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateSubjectDto } from './dtos/create-subject.dto';
import { TransformerStringsPipe } from '../shared/pipes/transform-strings/transformer-strings.pipe';
import { SubjectsService } from './subjects.service';
import { Subject } from './entities/subject.entity';
import { UpdateSubjectDto } from './dtos/update-subject.dto';

@Controller('subjects')
export class SubjectsController {

    constructor(
        private readonly subjectsService: SubjectsService
    ){}

    @Get('all')
    getSubjects(): Promise<Subject[]> {
        return this.subjectsService.getSubjects();
    }

    @Get(':id')
    getSubjectById(@Param('id', ParseIntPipe) id: number): Promise<Subject> {
        return this.subjectsService.getSubjectById(id);
    }

    @Post('create')
    createSubject(@Body(TransformerStringsPipe) subject: CreateSubjectDto): Promise<Subject> {
        return this.subjectsService.createSubject(subject);
    }

    @Put('update/:id')
    updateSubject(
        @Param('id', ParseIntPipe) id: number,
        @Body(TransformerStringsPipe) subject: UpdateSubjectDto
    ): Promise<Subject> {
        return this.subjectsService.updateSubject(id, subject);
    }

    @Delete('remove/:id')
    deleteSubject(@Param('id', ParseIntPipe) id: number): Promise<Subject> {
        return this.subjectsService.deleteSubject(id);
    }
}
