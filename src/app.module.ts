import { Module } from '@nestjs/common';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

import { AppService } from './app.service';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../www'),
    //   exclude: ['/api*'],
    // }),
    TransferModule,
  ],

  providers: [AppService],

  controllers: [],
})
export class AppModule {}
