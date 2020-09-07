import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { join } from 'path';

@Module({
  imports: [
    LoggerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../www'),
      exclude: ['/api*'],
    }),
  ],

  providers: [AppService],
})
export class AppModule {}
