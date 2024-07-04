import { IsDate, IsNumber, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsString()
    name?: string;

    @IsString()
    description?: string;

    @IsDate()
    date?: Date;

    @IsNumber()
    subjectId?: number;
}