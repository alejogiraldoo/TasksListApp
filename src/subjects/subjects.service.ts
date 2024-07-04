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

    async getSubjectById(id: number) {
        const subjectFound = await this.subjectRepository.findOne({
            where: {
                id: id
            },
            relations: ['tasks']
        });

        if (!subjectFound) throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
        return subjectFound;
    }

    private async getSubjectByName(name: string) {
        const subjectFound = await this.subjectRepository.findOne({
            where: {
                name: name
            }
        });

        if (!subjectFound) throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
        return subjectFound;
    }

    async createSubject(subject: CreateSubjectDto) {
        try{
            const subjectFound = await this.getSubjectByName(subject.name);
            if(subjectFound) throw new HttpException('Subject already exists', HttpStatus.CONFLICT);
        } catch (error) {
            if(error instanceof HttpException && error.getStatus() === HttpStatus.NOT_FOUND){
                const newSubject = this.subjectRepository.create(subject);
                return await this.subjectRepository.save(newSubject);
            }
            throw error;
        }
    }

    async updateSubject(id: number, subject: UpdateSubjectDto) {
        const [existingSubjectById, existingSubjectByName] : [Subject | HttpException, Subject | HttpException] = await Promise.all([
            this.getSubjectById(id).catch(error => error),
            this.getSubjectByName(subject.name).catch(error => error)
        ]);

        if (existingSubjectById instanceof HttpException) throw existingSubjectById;


        if (!(existingSubjectByName instanceof HttpException))
            throw new HttpException('Subject already exists', HttpStatus.CONFLICT);

        const updatedSubject = Object.assign(existingSubjectById, subject);
        return this.subjectRepository.save(updatedSubject);
    }

    async deleteSubject(id: number) {
        const subjectFound = await this.getSubjectById(id);

        await this.subjectRepository.delete({ id });
        return subjectFound;
    }
}
