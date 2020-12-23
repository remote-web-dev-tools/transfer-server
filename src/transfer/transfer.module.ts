import { Module } from '@nestjs/common';
import { ResponseService } from '../common/services/response.service';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [TransferController],
  providers: [TransferService, ResponseService],
  imports: [ScheduleModule.forRoot()],
})
export class TransferModule {}
