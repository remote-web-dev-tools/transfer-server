import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { ResponseService, Response } from '../common/services/response.service';
import { TransferDto } from './dto/transfer.dto';
import { ClientId } from './interfaces/transfer-id.interface';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Ip } from '@nestjs/common';

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
    summary: "Get serverId's clientIds by ServerId",
  })
  @Get('/client-ids/:serverId')
  getClientIdsByServerId(
    @Param('serverId') serverId: string,
  ): Response<{ serverId: string; data: ClientId[] }> {
    return this.responseService.createSuccessResponse({
      serverId,
      data: this.transferService.getClientIds(serverId),
    });
  }

  @ApiOperation({
    summary: "Get serverId's clientIds",
  })
  @Get('/client-ids')
  getClientIds(
    @Ip() ip: string,
  ): Response<{ serverId: string; data: ClientId[] }> {
    return this.responseService.createSuccessResponse({
      serverId: ip,
      data: this.transferService.getClientIds(ip),
    });
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
  ): Response<{ clientId: string; serverId: string; data: any[] }> {
    return this.responseService.createSuccessResponse({
      clientId,
      serverId,
      data: this.transferService.getTransferData(serverId, clientId),
    });
  }

  @ApiOperation({
    summary: 'Upload transfer data',
  })
  @Post('/upload')
  uploadTransferData(
    @Body() body: TransferDto,
    @Ip() ip: string,
  ): Response<void> {
    const { clientId = ip, data, serverId } = body;

    this.transferService.appendTransferData(serverId, clientId, data);

    return this.responseService.createSuccessResponse();
  }
}
