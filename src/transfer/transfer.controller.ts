import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { ResponseService, Response } from '../common/services/response.service';
import { TransferDto } from './dto/transfer.dto';
import { ClientId } from './interfaces/transfer-id.interface';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Transfer')
@Controller('/api/transfer')
export class TransferController {
  constructor(
    private transferService: TransferService,
    private responseService: ResponseService,
  ) {}

  @ApiParam({
    name: 'serverId',
    required: true,
    description: 'Server ID',
  })
  @ApiOperation({
    summary: "Get serverId's clientIds",
  })
  @Get('/client-ids/:serverId')
  getClientIds(@Param() serverId: string): Response<ClientId[]> {
    return this.responseService.createSuccessResponse(
      this.transferService.getClientIds(serverId),
    );
  }

  @ApiParam({
    name: 'serverId',
    required: true,
    description: 'Server ID',
  })
  @ApiParam({
    name: 'clientId',
    required: true,
    description: 'Client ID',
  })
  @ApiOperation({
    summary: "Get the serverId and clientId' transfer data",
  })
  @Get('/data/:serverId/:clientId')
  getTransferData(
    @Param() serverId: string,
    @Param() clientId: string,
  ): Response<any[]> {
    return this.responseService.createSuccessResponse(
      this.transferService.getTransferData(serverId, clientId),
    );
  }

  @ApiOperation({
    summary: 'Upload transfer data',
  })
  @Post('/upload')
  uploadTransferData(@Body() body: TransferDto): Response<void> {
    const { clientId, data, serverId } = body;

    this.transferService.appendTransferData(serverId, clientId, data);

    return this.responseService.createSuccessResponse();
  }
}
