import { S3 } from '@aws-sdk/client-s3';

const client = new S3({
  forcePathStyle: false,
  endpoint: 'https://fra1.digitaloceanspaces.com',
  region: 'fra1',
  credentials: {
    accessKeyId: 'DO003Z8QAHQZTZK68UNF',
    secretAccessKey: 'YWbBo6qNjmTEm2bl1TjJOszVnIPPKQonPUietCLVti4',
  },
});

export default client;
