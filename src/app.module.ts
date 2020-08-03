import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [AppService],
})
export class AppModule {}
