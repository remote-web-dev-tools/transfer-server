import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { ResponseService, Response } from '../common/services/response.service';
import { TransferDto } from './dto/transfer.dto';
import { ClientId } from './interfaces/transfer-id.interface';

@Controller('/api/transfer')
export class TransferController {
  constructor(
    private transferService: TransferService,
    private responseService: ResponseService,
  ) {}

  @Get('/client-ids/:serverId')
  GetCategories(@Param() serverId: string): Response<ClientId[]> {
    return this.responseService.createSuccessResponse(
      this.transferService.getClientIds(serverId),
    );
  }

  @Get('/data/:serverId/:clientId')
  GetData(
    @Param() serverId: string,
    @Param() clientId: string,
  ): Response<any[]> {
    return this.responseService.createSuccessResponse(
      this.transferService.getTransferData(serverId, clientId),
    );
  }

  @Post('/upload')
  setLogs(@Body() body: TransferDto): Response<void> {
    const { clientId, data, serverId } = body;

    this.transferService.appendTransferData(serverId, clientId, data);

    return this.responseService.createSuccessResponse();
  }
}
