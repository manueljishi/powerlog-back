import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutineModule } from './routine/routine.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TrainerDataModule } from './trainer_data/trainer_data.module';
console.log('process.env.MONGO_URI', process.env.MONGODB_URI);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),
    RoutineModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    TrainerDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
