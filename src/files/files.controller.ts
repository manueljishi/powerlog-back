import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { FilesService } from './files.service';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import client from './clients/s3_client';
import { FileUploadDto } from './clients/dto/file-upload.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  async getUploadUrl(@Body() data: FileUploadDto) {
    console.log(data.bucketName);
    const bucketParams = {
      Bucket: data.bucketName,
      Key: data.key,
      ContentType: data.contentType,
    };
    try {
      const url = await getSignedUrl(
        client,
        new PutObjectCommand(bucketParams),
        {
          expiresIn: 5 * 60,
        },
      );
      return url;
    } catch (e) {
      console.log(e);
    }
  }
}
