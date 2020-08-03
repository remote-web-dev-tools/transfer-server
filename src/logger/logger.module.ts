import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ResponseService } from '../common/services/response.service';

@Module({
  controllers: [LoggerController],
  providers: [LoggerService, ResponseService],
  imports: [ScheduleModule.forRoot()],
})
export class LoggerModule {}
