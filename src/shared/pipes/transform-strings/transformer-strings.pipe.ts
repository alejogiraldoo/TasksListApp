import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateSubjectDto } from 'src/subjects/dtos/create-subject.dto';

@Injectable()
export class TransformerStringsPipe implements PipeTransform {
  transform(value: CreateSubjectDto, metadata: ArgumentMetadata) {
    value.name = value.name.toLowerCase();
    value.name = value.name.charAt(0).toUpperCase() + value.name.slice(1);
    return value;
  }
}
