import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [TransferModule],

  providers: [AppService],

  controllers: [],
})
export class AppModule {}
