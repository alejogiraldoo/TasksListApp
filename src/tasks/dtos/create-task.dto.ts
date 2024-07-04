import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsDate()
    date: Date;

    @IsNumber()
    @IsNotEmpty()
    subjectId: number;
}