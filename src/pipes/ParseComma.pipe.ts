import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseCommaPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
  }
}
