import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [LoggerController],
  providers: [LoggerService],
  imports: [ScheduleModule.forRoot()],
})
export class LoggerModule {}
