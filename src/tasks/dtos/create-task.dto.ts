import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsNumber()
    @IsNotEmpty()
    subjectId: number;
}