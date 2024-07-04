import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dtos/create-subject.dto';
import { UpdateSubjectDto } from './dtos/update-subject.dto';

@Injectable()
export class SubjectsService {

    constructor(
        @InjectRepository(Subject) private readonly subjectRepository: Repository<Subject>
    ){}

    async getSubjects(){
        return await this.subjectRepository.find();
    }

    async getSubjectById(id: number){
        const subjectFound = await this.subjectRepository.findOne({
            where: {
                id: id
            },
            relations: ['tasks']
        });

        if(!subjectFound) return new HttpException('Subject not found', HttpStatus.NOT_FOUND);
        return subjectFound;
    }

    async createSubject(subject: CreateSubjectDto){
        const subjectFound = await this.subjectRepository.findOne({
            where: {
                name: subject.name
            }
        });

        if(subjectFound) return new HttpException('Subject already exists', HttpStatus.CONFLICT);

        const newSubject = this.subjectRepository.create(subject);
        return this.subjectRepository.save(newSubject);
    }

    async updateSubject(id: number, subject: UpdateSubjectDto){
        const subjectFound = await this.getSubjectById(id);

        if(!subjectFound) return new HttpException('Subject not found', HttpStatus.NOT_FOUND);

        const updatedSubject = Object.assign(subjectFound, subject);
        return this.subjectRepository.save(updatedSubject);
    }

    async deleteSubject(id: number){
        const subjectFound = await this.getSubjectById(id);

        if(!subjectFound) return new HttpException('Subject not found', HttpStatus.NOT_FOUND);

        this.subjectRepository.delete({id});
        return subjectFound;
    }
}
