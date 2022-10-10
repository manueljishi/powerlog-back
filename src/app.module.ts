import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeeklogModule } from './weeklog/weeklog.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    WeeklogModule,
    MongooseModule.forRoot('mongodb://localhost/powerlog'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
