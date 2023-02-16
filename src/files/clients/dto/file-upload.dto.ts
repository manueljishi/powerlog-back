import { IsString } from 'class-validator';

export class FileUploadDto {
  @IsString()
  bucketName: string;
  @IsString()
  key: string;
  @IsString()
  contentType: string;
}
