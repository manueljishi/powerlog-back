import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutineModule } from './routine/routine.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TrainerDataModule } from './trainer_data/trainer_data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RoutineModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@mongotest.w3q4g.mongodb.net/?retryWrites=true&w=majority`,
    ),
    TrainerDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
